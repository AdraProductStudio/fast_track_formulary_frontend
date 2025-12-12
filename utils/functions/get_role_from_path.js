"use client";

import { decryptData } from "~/utils/crypto";

export default function get_role_from_path() {
    if (typeof window === "undefined") return null;

    const url = new URL(window.location.href);
    let enc = url.searchParams.get("logout_from");
    if (enc) enc = enc.trim().replace(/ /g, "+");

    const role = enc ? decryptData(enc) : null;

    const pathname = window.location.pathname;

    // if (pathname.startsWith("/admin")) return "admin";
    // if (pathname.startsWith("/user")) return "user";
    // return role || null;

    return "user";
}
