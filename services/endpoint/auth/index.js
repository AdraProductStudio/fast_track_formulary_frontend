
"use client";
import LoginValidation from "~/validate/login";
import search_instance from "../../axios/search_instance";
import axios from "axios";


//-----------------------------------------------Refresh token functions ------------------------------------------------------//
export async function handle_refresh_token(role) {
    try {
        let basic_auth_string = btoa(`vedha@adraproductstudio.com:NByJ5+gi7ZuzZra78DlQMi2/W5q3LYiHWQxLeA17Dtg=`);

        const { data } = await axios.get(process.env.NEXT_PUBLIC_URL_SEARCH_API_URL + "/gettoken", {
            headers: {
                Authorization: `Basic ${basic_auth_string}`,
                domain: "ftfsearchapi.fasttrackformulary.com"
            },
        });

        if (data?.error_code === 200) return data?.data?.token || null;
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

    props.setState((prev) => ({ ...prev, spinner: true }));

    try {
        let basic_auth_string = btoa(`${props.state.email_id}:${props.state.password}`);
        const { data } = await search_instance.get("/gettoken", {
            headers: {
                Authorization: `Basic ${basic_auth_string}`
            },
        });

        if (data?.error_code === 200) {

            if (props.get_access_log_cookie) {
                let signin_user_data = {
                    ...props.get_access_log_cookie,
                    ["user"]: {
                        last_login_on: new Date().toLocaleString(),
                        ...data?.data
                    }
                }

                props.set_access_log_cookie(signin_user_data);
            }
            // props.router.push("/user")
        }
    } catch (error) {
        console.warn(error?.message || "Login failed")
    }
    finally {
        props.setState((prev) => ({ ...prev, spinner: false }));
    }
}

//-----------------------------------------------Oauth Login functions ------------------------------------------------------//
// export function handleOauthLogin(props) {
//     if (props.get_access_log_cookie && props.user_role) {
//         let new_view_signup = {
//             ...props.get_access_log_cookie,
//             [props.user_role]: {
//                 last_login_on: new Date().toLocaleString(),
//                 email_id: props.email_id || '',
//                 access_token: props.access_token || '',
//             }
//         }

//         props.set_access_log_cookie(new_view_signup);
//     }

//     show_toast({ type: "success", message: "Sign in successful !", timeout: 1000 })
// }

//-----------------------------------------------Forgot password functions ------------------------------------------------------//
// export async function handle_forgot_password(props) {
//     const validationErrors = ForgotPasswordValidation(props.state || {});
//     if (Object.keys(validationErrors).length) {
//         props.set_errors(validationErrors);
//         return;
//     }

//     props.set_spinner(true);
//     const requiredParams = { email_id: props.state.email_id }
//     try {
//         const { data } = await axiosInstance.post("/forgot_password", requiredParams);

//         if (data?.error_code === 0) {
//             show_toast({ type: "success", message: data.message || "" })
//             props.setState({})
//         } else {
//             console.warn(data?.message || "Resend email failed. Please try again.")
//         }
//     } catch (error) {
//         console.warn(error?.message || "Resend email failed. Please try again.")
//     }
//     finally {
//         props.set_spinner(false);
//     }
// }

//-----------------------------------------------Forgot password functions ------------------------------------------------------//
// export async function handle_validate_reset_password_token(props) {
//     props.set_verify_token_glow(true);
//     try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL_API_URL}/get_token_email`, {
//             headers: { Authorization: `Bearer ${props.state.forgot_password_token}` },
//         });

//         if (data?.error_code === 0) {
//             props.setState({ email_id: data?.data?.email || '' });
//         } else {
//             console.warn(data?.message || "Forgot password token are not valid.")
//         }
//     } catch (error) {
//         console.warn(error?.message || "Forgot password token are not valid.")
//     }
//     finally {
//         props.set_verify_token_glow(false);
//     }
// }

// [create sub user password + reset password -----> two pages using this endpoint]
// export async function handle_reset_password(props) {
//     const validationErrors = ResetPasswordValidation(props.state || {});
//     if (Object.keys(validationErrors).length) {
//         props.set_errors(validationErrors);
//         return;
//     }

//     let params = { ...props.state };
//     params.user_pwd = sha256(params.password)

//     delete params.password
//     delete params.confirm_password

//     props.set_spinner(true);
//     try {
//         const { data } = await axiosInstance.post("/update_password", params);

//         if (data?.error_code === 0) {
//             props.router.push("/");
//             show_toast({ type: "success", message: data.message || "", timeout: 100 })
//         } else {
//             console.warn(data?.message || "Reset password failed. Please try again.")
//         }
//     } catch (error) {
//         console.warn(error?.message || "Reset password failed. Please try again.")
//     }
//     finally {
//         props.set_spinner(false);
//     }
// }

//-----------------------------------------------Get User details functions ------------------------------------------------------//
// export async function handle_get_user_details(props) {
//     props.set_user_data_glow(true)

//     try {
//         const { data } = await axiosInstance.get('/user_dashboard_details')
//         if (data?.error_code === 0) {
//             let project_log_data = {
//                 ...props.get_project_log_cookie,
//                 [data.data.user_details[0]?.user_role || "role_not_found"]: { ...data?.data?.user_details[0] } || {}
//             }

//             props.set_project_log_cookie(project_log_data);
//         }
//         else console.warn(data?.message || "Something went wrong. Please try again.");
//     }
//     catch (error) {
//         console.warn(error?.message || "Something went wrong. Please try again.");
//     }
//     finally {
//         props.set_user_data_glow(false)
//     }
// }