"use client";
import axios from "axios";
import show_toast from "~/utils/functions/toast";
import { send_whatsapp_error } from "~/utils/functions/whatsapp_catch_error_reporter";
import { auth_json } from "~/json/json_data/auth";

const user_instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_USER_API_URL,
    headers: { "Content-Type": "application/json" },
});
 
// === Request Interceptor ===
user_instance.interceptors.request.use((config) => {
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
            Headers: JSON.stringify(headers, null, 2),
            Body: JSON.stringify(data, null, 2),
        };

        console.table([tableData]); // put inside array to show rows properly
    }

    return config;
});

// === Response Interceptor ===
user_instance.interceptors.response.use(
    (response) => {
        const status = response?.status;
        if (![0, 200, 201].includes(status)) {
            //Whatsapp Error Reporter For TESTING IN ALL STATUS
            if (auth_json.status_messages[status] && process.env.NEXT_PUBLIC_URL_ENABLE_WHATSAPP_ERROR_REPORTER === "true") {
                const status_message = auth_json.status_messages[status] || "Something went wrong";
                send_whatsapp_error({
                    user_data: {},
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
            // Handle network error
            if (error.code === "ERR_NETWORK") {
                return Promise.reject({
                    ...error,
                    message: "Network Error: Unable to reach server. Please try again.",
                });
            }

            // WHATSAPP SERVER ERROR REPORTER
            const status = error?.response?.status;
            if (auth_json.status_messages[status] && process.env.NEXT_PUBLIC_URL_ENABLE_WHATSAPP_ERROR_REPORTER === "true") {
                const status_message = auth_json.status_messages[status] || "Something went wrong";
                send_whatsapp_error({
                    user_data: {},
                    alert_type: status_message,
                    status: status,
                    body: originalRequest?.data || {},
                    endpoint: originalRequest?.url || "",
                    method: originalRequest?.method || "",
                    role: "user",
                    data: error?.response || {},
                    error: error?.response?.data?.message || error?.message,
                });
            }

            show_toast({ type: "error", message: error?.response?.data?.title || "Something went wrong", timeout: 0 })
            return Promise.reject(error);
        } catch (err) {
            show_toast({ type: "error", message: err?.message || "Something went wrong", timeout: 0 })
            return Promise.reject(err);
        }
    }
);

export default user_instance;