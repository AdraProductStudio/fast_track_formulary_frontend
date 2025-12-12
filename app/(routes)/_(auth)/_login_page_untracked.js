"use client"

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import ButtonSpinner from "~/components/Spinner/ButtonSpinner";
import { Inputfunctions } from "~/json/Inputfunctions";
import useAuthUi from "~/json/json_data/auth";
import { handleLogin } from "~/services/endpoint/auth";
import { useAccessLogStore } from "~/store/access_log";
import { useAuthState } from "~/utils/functions/useAuthState";

export default function LoginScreen() {
    const router = useRouter();
    const { state, setStateFun, errors, setState, set_errors } = useAuthState({})
    const { jsx } = useAuthUi({ state, setState: setStateFun, errors, keyDownHandler });
    const { get_access_log_cookie, set_access_log_cookie } = useAccessLogStore();

    const submitLogin = useCallback(() => {
        handleLogin({ router, state, setState, set_errors, get_access_log_cookie, set_access_log_cookie });
    }, [state]);

    /* Handle Enter key login */
    function keyDownHandler(e) {
        if (e.key === "Enter") submitLogin();
    }

    return (
        <div className="h-100 med_search_page">
            <div className="card rounded-4">
                <div className="card-body login_form_content">
                    <div className="text-center mb-5">
                        <h5 className="title_one">MedSearch</h5>
                        <h6 className="para_one">Login</h6>
                    </div>

                    <div className="d-flex flex-wrap">
                        {Inputfunctions(jsx.login)}
                    </div>

                    <ButtonSpinner className="btn_brand_color w-100 py-2 mt-3" is_spinner={state?.spinner} title={state?.spinner ? "Signing in..." : "Sign In Securely"} onClick={submitLogin} />
                </div>
            </div>
        </div>
    );
}