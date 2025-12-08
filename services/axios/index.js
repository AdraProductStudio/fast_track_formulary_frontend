"use client";
import axios from "axios";
import { useAccessLogStore } from "~/store/access_log";
import get_role_from_path from "~/utils/functions/get_role_from_path";
import show_toast from "~/utils/functions/toast";
import { handle_refresh_token } from "../auth";
import { send_whatsapp_error } from "~/utils/functions/whatsapp_catch_error_reporter";
import { useProjectLogStore } from "~/store/project_log_store";
import { auth_json } from "~/json/json_data/auth";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API_URL,
    headers: { "Content-Type": "application/json" },
});

// === Token refresh control ===
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

// === Set Role based refresh token ===
function set_role_based_access_token_update({ role, token }) {
    const accessLog = useAccessLogStore.getState().get_access_log_cookie;
    const storeSetAccessLog = useAccessLogStore.getState().set_access_log_cookie;

    if (role) {
        const newAccessLog = { ...accessLog };
        newAccessLog[role] = {
            ...newAccessLog[role],
            access_token: token
        };

        storeSetAccessLog(newAccessLog);
    }

    return null;
}

// === Role-based token helper ===
function get_role_based_token() {
    if (typeof window === "undefined") return null;

    const role = get_role_from_path();
    const accessLog = useAccessLogStore.getState().get_access_log_cookie;

    if (role)
        return accessLog[role]?.access_token || null;

    return null;
}

// === Role-based user data helper ===
function get_role_based_user_data() {
    if (typeof window === "undefined") return {};

    const role = get_role_from_path();
    const projectLog = useProjectLogStore.getState().get_project_log_cookie;

    if (role)
        return projectLog[role] || {};

    return {};
}


// === Request Interceptor ===
axiosInstance.interceptors.request.use((config) => {
    const token = get_role_based_token();
    const role = get_role_from_path();

    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (role) {
        config.headers["x-role"] = role;
        config.role = role;
    }

    if (config.data instanceof FormData)
        config.headers["Content-Type"] = "multipart/form-data";
    else config.headers["Content-Type"] = "application/json";

    //Showing Sending request in local env
    if (process.env.NEXT_PUBLIC_URL_APP_ENV === "local") {
        const { url, method, data, headers } = config;
        console.log("")
        console.log("")
        console.log(`📡 Requesting ${url} Endpoint on ${new Date().toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }).toLocaleUpperCase()}`);
        const tableData = {
            URL: url,
            Method: method?.toUpperCase(),
            "X-Role": headers?.["x-role"] || headers?.["X-Role"],
            "Bearer Token": headers?.Authorization || headers?.authorization,
            Headers: JSON.stringify(headers, null, 2),
            Body: JSON.stringify(data, null, 2),
        };

        console.table([tableData]); // put inside array to show rows properly
    }

    return config;
});

// === Response Interceptor ===
axiosInstance.interceptors.response.use(
    (response) => {
        if (![0, 200, 201].includes(response?.data?.error_code)) {
            //Whatsapp Error Reporter For TESTING IN ALL STATUS
            const status = response?.data?.error_code;
            if (auth_json.status_messages[status] && process.env.NEXT_PUBLIC_URL_ENABLE_WHATSAPP_ERROR_REPORTER === "true") {
                const user_data = get_role_based_user_data();
                const status_message = auth_json.status_messages[status] || "Something went wrong";
                send_whatsapp_error({
                    user_data: user_data,
                    alert_type: status_message,
                    status: status,
                    endpoint: response?.config?.url || "",
                    method: response?.config?.method || "",
                    body: response?.config?.data || {},
                    role: response?.config?.role || "",
                    data: response?.data || {},
                    error: response?.data?.message || "Something went wrong",
                });
            }

            show_toast({ type: "error", message: response.data.message || "Something went wrong", timeout: 1000 })
        }

        return response
    },
    async (error) => {
        try {
            const originalRequest = error.config;
            const role = originalRequest.role || originalRequest.headers["x-role"];

            // Handle network error
            if (error.code === "ERR_NETWORK") {
                return Promise.reject({
                    ...error,
                    message: "Network Error: Unable to reach server. Please try again.",
                });
            }

            // Handle token expiration
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                (error.response.data.message === "Token expired" ||
                    error.response.data.message === "Invalid Token")
            ) {
                originalRequest._retry = true;

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token) => {
                                originalRequest.headers["Authorization"] = "Bearer " + token;
                                resolve(axiosInstance(originalRequest));
                            },
                            reject: (err) => reject(err),
                        });
                    });
                }

                isRefreshing = true;

                try {
                    // Refresh logic here
                    const newToken = await handle_refresh_token(role);
                    if (newToken)
                        set_role_based_access_token_update({ role, token: newToken });

                    processQueue(null, newToken);
                    originalRequest.headers["Authorization"] = "Bearer " + newToken;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            // WHATSAPP SERVER ERROR REPORTER
            const status = error?.response?.status;
            if (auth_json.status_messages[status] && process.env.NEXT_PUBLIC_URL_ENABLE_WHATSAPP_ERROR_REPORTER === "true") {
                const user_data = get_role_based_user_data();
                const status_message = auth_json.status_messages[status] || "Something went wrong";
                send_whatsapp_error({
                    user_data: user_data,
                    alert_type: status_message,
                    status: status,
                    body: originalRequest?.data || {},
                    endpoint: originalRequest?.url || "",
                    method: originalRequest?.method || "",
                    role,
                    data: error?.response || {},
                    error: error?.response?.data?.message || error?.message,
                });
            }

            show_toast({ type: "error", message: error?.message || "Something went wrong", timeout: 0 })
            return Promise.reject(error);
        } catch (err) {
            show_toast({ type: "error", message: err?.message || "Something went wrong", timeout: 0 })
            return Promise.reject(err);
        }
    }
);

export default axiosInstance;