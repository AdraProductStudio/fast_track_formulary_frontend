"use client";
import Icons from "~/public/icons"
import { Images } from "~/public/image";

export const auth_json = {
    status_messages: {
        // ⚠️ CLIENT ERRORS (4xx)
        400: "*⚠️ Warning ⚠️* Bad Request",
        403: "*⚠️ Warning ⚠️* Forbidden",
        405: "*⚠️ Warning ⚠️* Method Not Allowed",
        404: "*⚠️ Warning ⚠️* Not Found",
        408: "*⚠️ Warning ⚠️* Request Timeout",
        429: "*⚠️ Warning ⚠️* Too Many Requests",

        // 🚨 SERVER ERRORS (5xx)
        500: "*🚨 SERVER ERROR ALERT 🚨* Internal Server Error",
        501: "*🚨 SERVER ERROR ALERT 🚨* Not Implemented",
        502: "*🚨 SERVER ERROR ALERT 🚨* Bad Gateway",
        503: "*🚨 SERVER ERROR ALERT 🚨* Service Unavailable",
        504: "*🚨 SERVER ERROR ALERT 🚨* Gateway Timeout"
    },

    signin_buttons: [
        { buttonName: "Gmail", image: Images.gmail_image, callback: "" },
        { buttonName: "Linkedin", image: "https://devcdn.2ndcareers.com/linkedin.png", callback: "" },
        { buttonName: "Apple", image: "https://devcdn.2ndcareers.com/apple.png", callback: "" }
    ],
    signup_buttons: [
        { buttonName: "Gmail", image: Images.gmail_image, callback: "" },
        { buttonName: "Linkedin", image: "https://devcdn.2ndcareers.com/linkedin.png", callback: "" },
        { buttonName: "Apple", image: "https://devcdn.2ndcareers.com/apple.png", callback: "" }
    ],
}

export default function useAuthUi({ state = {}, setState = () => { }, keyDownHandler = () => { }, errors = {}, set_errors = () => { } }) {

    const jsx = {
        login: [
            {
                category: "input",
                type: "input_group",
                input_type: "text",
                title: "Email",
                name: "email",
                autoComplete: "email",
                placeholder: "Enter your email id",
                parent_style: "w-100 mb-3",
                child_style: "w-100",
                labelClassName: "text_auth_input_label",
                value: state?.email_id || "",
                is_mandatory: true,
                Err: errors?.email_id || "",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            },
            {
                category: "input",
                type: "input_group",
                input_type: "password",
                title: "Password",
                name: "password",
                autoComplete: "set password",
                placeholder: "Enter your password",
                parent_style: "w-100 mb-2",
                child_style: "",
                labelClassName: "text_auth_input_label",
                value: state?.password || "",
                is_mandatory: true,
                Err: errors?.password || "",
                onChange: (e) => setState("password", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            }
        ],

        forgot_password: [
            {
                category: "input",
                type: "input_group",
                input_type: "text",
                icon: Icons.email_icon,
                autoComplete: "email",
                placeholder: "Enter your email id",
                parent_style: "w-100 mb-3",
                value: state?.email_id || "",
                is_mandatory: true,
                Err: errors?.email_id || "",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            }
        ],

        reset_password: [
            {
                category: "input",
                type: "input_group",
                input_type: "text",
                icon: Icons.email_icon,
                autoComplete: "email",
                placeholder: "Enter your email id",
                parent_style: "w-100 mb-3",
                value: state?.email_id || "",
                is_mandatory: true,
                Err: errors?.email_id || "",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                disabled: true
            },
            {
                category: "input",
                type: "input_group",
                input_type: "password",
                icon: Icons.lock_icon,
                autoComplete: "set password",
                placeholder: "New password",
                parent_style: "w-100 mb-3",
                value: state?.password || "",
                is_mandatory: true,
                Err: errors?.password || "",
                onChange: (e) => setState("password", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            },
            {
                category: "input",
                type: "input_group",
                input_type: "password",
                icon: Icons.lock_icon,
                autoComplete: "set password",
                placeholder: "Confirm password",
                parent_style: "w-100 mb-3",
                value: state?.confirm_password || "",
                is_mandatory: true,
                Err: errors?.confirm_password || "",
                onChange: (e) => setState("confirm_password", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            }
        ],
    }

    return { jsx, json: auth_json }
}