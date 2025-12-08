"use client";
import { create } from "zustand";
import Cookies from "js-cookie";
import { encryptData, decryptData } from "~/utils/crypto";

const COOKIE_KEY = "two_nd_access_log";

// Load initial cookie state
const loadCookieState = () => {
  try {
    if (typeof window !== "undefined") {
      let cookie = Cookies.get(COOKIE_KEY);
      cookie = cookie ? decryptData(cookie) : {};

      if (process.env.NEXT_PUBLIC_URL_APP_ENV === "local") {
        console.log("Enabled Chatbot in [Professional, Employer]: ", process.env.NEXT_PUBLIC_URL_SHOW_CHATBOT);
        console.log("Whatsapp Error Reporter: ", process.env.NEXT_PUBLIC_URL_ENABLE_WHATSAPP_ERROR_REPORTER);
        console.log("")
        console.log("")
        console.log("Access Log Cookie Decrypted:");
        console.table([cookie]);

      }
      return cookie;
    }
    return {};
  } catch (err) {
    console.log("Cookie decrypt error:", err);
    return {};
  }
};

export const useAccessLogStore = create((set, get) => ({
  get_access_log_cookie: loadCookieState(),

  set_access_log_cookie: (newState) => {
    if (!Object.keys(newState).length) {
      Cookies.remove(COOKIE_KEY)
      return set({ get_access_log_cookie: {} });
    }

    set({ get_access_log_cookie: newState });

    try {
      const enc = encryptData(newState);
      if (enc) Cookies.set(COOKIE_KEY, enc, { expires: 1, sameSite: "none", secure: true });
    } catch (err) {
      console.log("Cookie save error:", err);
    }
  }
}));
