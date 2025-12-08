"use client";
import { useEffect, useState } from "react";
import sha256 from "sha256";
import Image from "~/components/Image";
import DotLoaderSingleLine from "~/components/Spinner/DotLoaderSingleLine";
import { Images } from "~/public/image";
import { encryptData } from "~/utils/crypto";
import useOnlineStatus from "~/utils/functions/useOnlineStatus";

export default function MaintananceMode({ children }) {
    const [isMaintananceMode, setIsMaintananceMode] = useState(null);
    const is_online = useOnlineStatus();
    const username = "project_fast_track_formulary";
    const password = "Fasttrackformulate@2026";

    const public_access_token_2ndcareers = btoa(`${username}:${sha256(password)}`);
    const endpoint_access_key = "fast_track_formulary_maintanance_mode_key:APSPvtLimited@2023";

    async function fetchMaintananceStatus() {
        if (!is_online) return;

        try {
            const response = await fetch("https://adminapi.adraproductstudio.com/api/v1/is_maintanance_break_announced",
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${public_access_token_2ndcareers}`,
                        'X-Custom-Encrypted-Header': `${encryptData({ endpoint: endpoint_access_key, expire_on: Date.now() + 20 * 1000 })}`
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

    useEffect(() => {
        fetchMaintananceStatus();

        const interval = setInterval(() => {
            fetchMaintananceStatus();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [is_online]);

    if (!is_online) {
        return (
            <div className="maintanance_mode_container">
                <div className="col-12 col-md-6 text-center">
                    <Image src={Images.page_not_found} width={300} height={300} alt="offline" />
                    <h1>No Internet Connection</h1>
                    <p>Your device seems to be offline.</p>
                    <p>Please check your network and try again.</p>
                </div>
            </div>
        );
    }

    if (isMaintananceMode === null) return null;

    return (
        isMaintananceMode && process.env.NEXT_PUBLIC_URL_MAINTANANCE_MODE === "true" ?
            <div className="maintanance_mode_container">
                <div className="col-12 col-md-6 text-center">
                    <Image src={Images.page_not_found} alt="Maintenance Mode" width={300} height={300} />
                    <DotLoaderSingleLine />
                    <h1>We'll be back soon!</h1>
                    <p>Our website is currently undergoing scheduled maintenance. Thank you for your patience.</p>
                </div>
            </div >
            :
            children
    )
}
