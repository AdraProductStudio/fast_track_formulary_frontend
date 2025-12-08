"use client";

import { useState, useEffect } from "react";

export default function useViewportScale() {
    const [size, setSize] = useState({ width: undefined, height: undefined });
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const ua = navigator.userAgent.toLowerCase();
        const isMac = ua.includes("mac");
        const ratio = window.devicePixelRatio || 1;
        const disableScale = process.env.NEXT_PUBLIC_DISABLE_VIEWPORT_SCALE === "true";

        if (disableScale) {
            setScale(1);
            return;
        }

        /**
         * ✅ Correct scaling logic:
         * - Mac retina already scaled → don't modify
         * - Windows monitors → scale by DPR
         * - Mobile stays natural
         */
        if (isMac && ratio > 1) {
            setScale(0.85);
        } else {
            setScale(1 / ratio);
        }
    }, []);

    return { ...size, scale };
}


export function useDeviceResizeListener() {
    const [size, setSize] = useState({ width: undefined, height: undefined });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // initial size
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}
