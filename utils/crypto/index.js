import CryptoJS from "crypto-js";
const SECRET = process.env.NEXT_PUBLIC_URL_CRYPTO_SECRET_KEY;
const EXPIRE_TIME = process.env.NEXT_PUBLIC_URL_EXPIRES_SECONDS;
const APP_ENV = process.env.NEXT_PUBLIC_URL_APP_ENV;
export function encryptData(data) {
    try {
        // Convert the data to a JSON string before encryption
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET).toString(); // Ciphertext as base64

        const safe = encrypted
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        return safe;
    } catch (err) {
        console.warn("Encryption error:", err);
        return null;
    }
}

export function decryptData(encrypted) {
    try {
        const base64 = encrypted
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            + "=".repeat((4 - encrypted.length % 4) % 4);

        const bytes = CryptoJS.AES.decrypt(base64, SECRET);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText ? JSON.parse(decryptedText) : null;
    } catch (err) {
        console.warn("Decryption error:", err);
        return null;
    }
}

export async function encryptEndpointAndRedirect(url) {
    const encrypted = await encryptData({
        url: url,
        expires_in: new Date(Date.now() + EXPIRE_TIME * 1000).toISOString()
    });

    const safe = encrypted
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    location.href = APP_ENV === 'production' ? `/api/enc__${safe}__enc` : `/api/${url}`;
}

export async function encryptEndpoint(url) {
    const encrypted = await encryptData({
        url: url,
        expires_in: new Date(Date.now() + EXPIRE_TIME * 1000).toISOString()
    });
    
    const safe = encrypted
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    return APP_ENV === 'production' ? `/api/enc__${safe}__enc` : `/api/${url}`;
}