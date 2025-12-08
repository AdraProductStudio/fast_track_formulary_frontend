"use client";

import { useEffect } from "react";

export default function useScrollToTop(ref) {
    useEffect(() => {
        const el = ref?.current;
        if (el && typeof el.scrollTo === "function") {
            el.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);
}
