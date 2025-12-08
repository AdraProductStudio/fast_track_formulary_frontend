"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccessLogStore } from "~/store/access_log";
import show_toast from "~/utils/functions/toast";

export default function ProfAuth({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { get_access_log_cookie } = useAccessLogStore();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = get_access_log_cookie['professional']?.access_token;

        if (!token) {
            show_toast({ type: "error", message: "Unauthorized access. Please login to continue.", timeout: 200 });
            router.replace("/");
        } else {
            setCheckingAuth(false);
            if (pathname === "/professional") {
                router.push("/professional/home")
            }
        }
    }, [get_access_log_cookie]);

    if (checkingAuth) {
        return null;
    }

    return <>{children}</>;
}
