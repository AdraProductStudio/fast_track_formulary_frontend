import { useEffect, useState } from "react";
import { useSignupStore } from "~/store/signupStore";

export function useAuthState(initialState = {}, initialErrors = {}) {
    const { steps, setEditMode } = useSignupStore();
    const [state, setState] = useState(initialState);
    const [errors, set_errors] = useState(initialErrors);
    const [resend_mail_timer, set_resend_mail_timer] = useState(null);

    useEffect(() => {
        if (resend_mail_timer === 0) {
            set_resend_mail_timer(null);
        }

        if (!resend_mail_timer) return;

        const intervalId = setInterval(() => {
            set_resend_mail_timer(resend_mail_timer - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [resend_mail_timer]);

    function setStateFun(field, value) {
        // remove the field from errors if it exists
        if (errors[field]) {
            const newErrors = { ...errors };
            delete newErrors[field];
            set_errors(newErrors);
        }

        // update the main state
        setState((prev) => ({ ...prev, [field]: value }));

        //Edit mode if email exists in steps
        if (steps.email_id) {
            setEditMode(true);
        }
    }

    return { state, errors, resend_mail_timer, set_resend_mail_timer, set_errors, setStateFun, setState };
}
