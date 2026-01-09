"use client";
import { useEffect, useState } from "react";
import sha256 from "sha256";
import Image from "~/components/Image";
import DotLoaderSingleLine from "~/components/Spinner/DotLoaderSingleLine";
import SpinnerComponent from "~/components/Spinner/Spinner";
import { Images } from "~/public/image";
import { handleLogin } from "~/services/endpoint/auth";
import { useAccessLogStore } from "~/store/access_log";
import { useAuthState } from "~/utils/functions/useAuthState";
import useOnlineStatus from "~/utils/functions/useOnlineStatus";

export default function MaintananceMode({ children }) {
    const [isMaintananceMode, setIsMaintananceMode] = useState(null);
    const is_online = useOnlineStatus();
    const username = "project_fast_track_formulary";
    const password = "Fasttrackformulate@2026";

    const public_access_token_2ndcareers = btoa(`${username}:${sha256(password)}`);
    const endpoint_access_key = "fast_track_formulary_maintanance_mode_key:APSPvtLimited@2023";
    const custom_header_object = { endpoint_access_key: endpoint_access_key, expire_on: Date.now() + 30 * 1000 }

    const { state, setState, set_errors } = useAuthState({ email_id: "vedha@adraproductstudio.com", password: "NByJ5+gi7ZuzZra78DlQMi2/W5q3LYiHWQxLeA17Dtg=" })
    const { get_access_log_cookie, set_access_log_cookie } = useAccessLogStore();

    async function fetchMaintananceStatus() {
        if (!is_online) return;

        try {
            const response = await fetch("https://adminapi.adraproductstudio.com/api/v1/is_maintanance_break_announced",
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${public_access_token_2ndcareers}`,
                        'X-Custom-Encrypted-Header': `${btoa(JSON.stringify(custom_header_object))}`
                    },
                    cache: 'no-store'
                });

            const data = await response.json();
            setIsMaintananceMode(data?.data?.maintanance_mode ?? false);
        } catch (error) {
            console.warn("Error fetching maintenance mode status:", error);
            setIsMaintananceMode(false);
        }
    }

    async function authenticateUser() {
        if (!get_access_log_cookie['user']?.token)
            handleLogin({ state, setState, set_errors, get_access_log_cookie, set_access_log_cookie });
    }

    useEffect(() => {
        fetchMaintananceStatus();
        authenticateUser();

        const interval = setInterval(() => {
            fetchMaintananceStatus();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [is_online]);

    if (!is_online) {
        return (
            <main className="main_layout_resolution">
                <header className="main_layout_header_resolution">
                    <div className="col">
                        <Image src={Images.logo_image} width={130} height={95} alt="logo" />
                    </div>
                </header>

                <div className="main_layout_body_resolution">
                    <div className="h-100 med_search_page">
                        <div className="card rounded-4">
                            <div className="card-body login_form_content text-center">
                                <div className="col-12 text-center">
                                    <h1>No Internet Connection</h1>
                                    <p>Your device seems to be offline.</p>
                                    <p>Please check your network and try again.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        );
    }

    if (isMaintananceMode === null) return null;

    if (state?.spinner || !get_access_log_cookie['user']?.token)
        return (
            <main className="main_layout_resolution">
                <header className="main_layout_header_resolution">
                    <div className="col">
                        <Image src={Images.logo_image} width={130} height={95} alt="logo" />
                    </div>
                </header>

                <div className="main_layout_body_resolution">
                    <div className="h-100 med_search_page">
                        <div className="card rounded-4">
                            <div className="card-body login_form_content text-center">
                                {state?.spinner ?
                                    <SpinnerComponent className="custom_login_spinner" />
                                    :
                                    <h5>Authentication failed</h5>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )

    return (
        isMaintananceMode && process.env.NEXT_PUBLIC_URL_MAINTANANCE_MODE === "true" ?
            <main className="main_layout_resolution">
                <header className="main_layout_header_resolution">
                    <div className="col">
                        <Image src={Images.logo_image} width={130} height={95} alt="logo" />
                    </div>
                </header>

                <div className="main_layout_body_resolution">
                    <div className="h-100 med_search_page">
                        <div className="card rounded-4">
                            <div className="card-body login_form_content text-center">
                                <div className="col-12 text-center">
                                    <DotLoaderSingleLine />
                                    <h1>We'll be back soon!</h1>
                                    <p>Our website is currently undergoing scheduled maintenance. Thank you for your patience.</p>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
            </main>
            :
            children
    )
}
