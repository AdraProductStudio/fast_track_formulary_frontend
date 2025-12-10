"use client";

import { create } from "zustand";
import Cookies from "js-cookie";
import { encryptData, decryptData } from "~/utils/crypto";
import get_role_from_path from "~/utils/functions/get_role_from_path";

const COOKIE_KEY = "ftf_project_log";

// load initial cookie state
function loadCookieState() {
  try {
    if (typeof window !== "undefined") {
      let cookie = Cookies.get(COOKIE_KEY);
      cookie = cookie ? decryptData(cookie) : {};

      if (process.env.NEXT_PUBLIC_URL_APP_ENV === "local") {
        console.log("")
        console.log("")
        console.log("Project Log Cookie Decrypted:");
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


function get_role_based_user_data(get) {
  const project_log = get().get_project_log_cookie;
  const role = get_role_from_path();
  return role ? project_log[role] || {} : {}
}

export const useProjectLogStore = create((set, get) => ({
  get_project_log_cookie: loadCookieState(),

  role_based_project_log: () => get_role_based_user_data(get),

  set_project_log_cookie: (newState) => {
    if (!Object.keys(newState).length) {
      Cookies.remove(COOKIE_KEY);
      return set({ get_project_log_cookie: {} });
    }

    set({ get_project_log_cookie: newState });

    try {
      const enc = encryptData(newState);
      if (enc) Cookies.set(COOKIE_KEY, enc, { expires: 1, sameSite: "none", secure: true });
    } catch (err) {
      console.log("Cookie save error:", err);
    }
  }
}));