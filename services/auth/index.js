
"use client";
import sha256 from "sha256";
import axiosInstance from "../axios";
import LoginValidation from "~/validate/login";
import show_toast from "~/utils/functions/toast";
import { auth_json } from "~/json/json_data/auth";
import ForgotPasswordValidation from "~/validate/forgot_password";
import ResetPasswordValidation from "~/validate/reset_password";
import axios from "axios";


//-----------------------------------------------Refresh token functions ------------------------------------------------------//
export async function handle_refresh_token(role) {
    try {
        const { data } = await axiosInstance.post('/renewal_access_token', { role });

        if (data?.error_code === 0 || data?.error_code === 200) return data?.data?.access_token || null;
        else return null;
    } catch (error) {
        console.warn(error?.message || "Token refresh failed.")
        return null;
    }
}


//-----------------------------------------------Login functions ------------------------------------------------------//
export async function handleLogin(props) {
    const validationErrors = LoginValidation(props.state || {});
    if (Object.keys(validationErrors).length) {
        props.set_errors(validationErrors);
        return;
    }

    props.set_spinner(true);
    try {
        const { data } = await axiosInstance({
            method: "post", url: "/login",
            auth: {
                username: props.state.email_id.trim(),
                password: sha256(props.state.password.trim()),
            },
        });

        if (data.error_code === 0) {
            if (props.get_access_log_cookie && data.data.user_role) {
                let new_view_signup = {
                    ...props.get_access_log_cookie,
                    [data.data.user_role]: {
                        last_login_on: new Date().toLocaleString(),
                        email_id: props.state.email_id || '',
                        access_token: data.data.access_token || '',
                        payment_status: data.data.payment_status || '',
                        pricing_category: data.data.pricing_category || '',
                    }
                }

                props.set_access_log_cookie(new_view_signup);
            }

        }
        else {
            if (data.error_code === 401 && data?.data?.user_role) {
                if (!props.resend_mail_timer) {
                    props.set_resend_mail_timer(0);
                    props.setState({ ...props.state, resend_mail_access_token: data?.data?.access_token || '' });
                }
            }
            console.warn(data?.message || "Login failed")
        }
    } catch (error) {
        console.warn(error?.message || "Login failed")
    }
    finally {
        props.set_spinner(false);
    }
}

//-----------------------------------------------Oauth Login functions ------------------------------------------------------//
export function handleOauthLogin(props) {
    const professional_steps = auth_json.professional_registration_steps || [];

    if (props.get_access_log_cookie && props.user_role) {
        let new_view_signup = {
            ...props.get_access_log_cookie,
            [props.user_role]: {
                last_login_on: new Date().toLocaleString(),
                email_id: props.email_id || '',
                access_token: props.access_token || '',
            }
        }

        props.set_access_log_cookie(new_view_signup);
    }

    show_toast({ type: "success", message: "Sign in successful !", timeout: 1000 })
}

//-----------------------------------------------Forgot password functions ------------------------------------------------------//
export async function handle_forgot_password(props) {
    const validationErrors = ForgotPasswordValidation(props.state || {});
    if (Object.keys(validationErrors).length) {
        props.set_errors(validationErrors);
        return;
    }

    props.set_spinner(true);
    const requiredParams = { email_id: props.state.email_id }
    try {
        const { data } = await axiosInstance.post("/forgot_password", requiredParams);

        if (data?.error_code === 0) {
            show_toast({ type: "success", message: data.message || "" })
            props.setState({})
        } else {
            console.warn(data?.message || "Resend email failed. Please try again.")
        }
    } catch (error) {
        console.warn(error?.message || "Resend email failed. Please try again.")
    }
    finally {
        props.set_spinner(false);
    }
}

//-----------------------------------------------Forgot password functions ------------------------------------------------------//
export async function handle_validate_reset_password_token(props) {
    props.set_verify_token_glow(true);
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_API_URL}/get_token_email`, {
            headers: { Authorization: `Bearer ${props.state.forgot_password_token}` },
        });

        if (data?.error_code === 0) {
            props.setState({ email_id: data?.data?.email || '' });
        } else {
            console.warn(data?.message || "Forgot password token are not valid.")
        }
    } catch (error) {
        console.warn(error?.message || "Forgot password token are not valid.")
    }
    finally {
        props.set_verify_token_glow(false);
    }
}

// [create sub user password + reset password -----> two pages using this endpoint]
export async function handle_reset_password(props) {
    const validationErrors = ResetPasswordValidation(props.state || {});
    if (Object.keys(validationErrors).length) {
        props.set_errors(validationErrors);
        return;
    }

    let params = { ...props.state };
    params.user_pwd = sha256(params.password)

    delete params.password
    delete params.confirm_password

    props.set_spinner(true);
    try {
        const { data } = await axiosInstance.post("/update_password", params);

        if (data?.error_code === 0) {
            props.router.push("/");
            show_toast({ type: "success", message: data.message || "", timeout: 100 })
        } else {
            console.warn(data?.message || "Reset password failed. Please try again.")
        }
    } catch (error) {
        console.warn(error?.message || "Reset password failed. Please try again.")
    }
    finally {
        props.set_spinner(false);
    }
}

//-----------------------------------------------Resend email functions ------------------------------------------------------//
export async function handle_resend_email(props) {
    const requiredParams = { email_id: props.state.email_id }
    try {
        const { data } = await axiosInstance.post("/resend_email", requiredParams, {
            headers: { Authorization: `Bearer ${props.state.resend_mail_access_token}` }
        });

        if (data?.error_code === 0 || data?.error_code === 200) {
            props.set_resend_mail_timer(90)
        } else {
            console.warn(data?.message || "Resend email failed. Please try again.");
        }
    } catch (error) {
        console.warn(error?.message || "Resend email failed. Please try again.")
    }
}

//-----------------------------------------------notification functions ------------------------------------------------------//
export async function handle_get_notifications(props) {
    try {
        const { data } = await axiosInstance.get('/professional_notifications')

        if (data?.error_code === 0) props.set_notification_data({ data: data.data })
        else console.warn(data?.message || "Something went wrong. Please try again.");
    }
    catch (error) {
        console.warn(error?.message || "Something went wrong. Please try again.");
    }
}

export async function handle_delete_notifications(props) {
    let params = { notification_id: props.deletion_id === "All" ? "" : props.deletion_id }
    let filtered_notifications = props.deletion_id === "All" ? [] : props.notification_data?.data?.filter((item) => item.id !== props.deletion_id)

    props.set_notification_data({ ...props.notification_data, deletion_id: props?.deletion_id })

    try {
        const { data } = await axiosInstance.post('/delete_notifications', params)

        if (data?.error_code === 0) props.set_notification_data({ data: filtered_notifications, deletion_id: null })
        else console.warn(data?.message || "Something went wrong. Please try again.");
    }
    catch (error) {
        console.warn(error?.message || "Something went wrong. Please try again.");
    }
    finally {
        props.set_notification_data({ data: filtered_notifications, deletion_id: null })
    }
}

//-----------------------------------------------Get User details functions ------------------------------------------------------//
export async function handle_get_user_details(props) {
    props.set_user_data_glow(true)

    try {
        const { data } = await axiosInstance.get('/user_dashboard_details')
        if (data?.error_code === 0) {
            let project_log_data = {
                ...props.get_project_log_cookie,
                [data.data.user_details[0]?.user_role || "role_not_found"]: { ...data?.data?.user_details[0] } || {}
            }

            props.set_project_log_cookie(project_log_data);
        }
        else console.warn(data?.message || "Something went wrong. Please try again.");
    }
    catch (error) {
        console.warn(error?.message || "Something went wrong. Please try again.");
    }
    finally {
        props.set_user_data_glow(false)
    }
}