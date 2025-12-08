"use client";

import { useEffect } from "react";
import useViewportScale from "~/utils/functions/useViewportScale";
import BootstrapClient from "~/app/bootstrap-client";
import DotLoader from "../Spinner/DotLoader";

export default function ClientRootLayout({ children }) {
    const { width, height, scale } = useViewportScale();
    const shouldScale = width > 876 && scale !== 1;

    useEffect(() => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isMobile) return;

        const preventWheel = e => e.ctrlKey && e.preventDefault();
        const preventKeys = e =>
            (e.ctrlKey || e.metaKey) &&
            ["+", "-", "=", "0"].includes(e.key) &&
            e.preventDefault();

        window.addEventListener("wheel", preventWheel, { passive: false });
        window.addEventListener("keydown", preventKeys);

        return () => {
            window.removeEventListener("wheel", preventWheel);
            window.removeEventListener("keydown", preventKeys);
        };
    }, []);

    useEffect(() => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (!isMobile && width > 992) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }

    }, [width]);

    return !width || !height ? (
        <DotLoader />
    ) : (
        <>
            <BootstrapClient />
            {shouldScale ? (
                <div
                    style={{
                        width: `${width / scale}px`,
                        height: `${height / scale}px`,
                        transform: `scale(${scale})`,
                        transformOrigin: "0 0",
                        overflow: "hidden",
                    }}
                >
                    {children}
                </div>
            ) : (
                <div style={{ width: "100vw", height: "100vh" }}>{children}</div>
            )}
        </>
    );
}
