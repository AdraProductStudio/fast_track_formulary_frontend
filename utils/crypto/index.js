import CryptoJS from "crypto-js";

const SECRET = process.env.NEXT_PUBLIC_URL_CRYPTO_SECRET_KEY;
const EXPIRE_TIME = process.env.NEXT_PUBLIC_URL_EXPIRES_SECONDS;
const APP_ENV = process.env.NEXT_PUBLIC_URL_APP_ENV;

// Base62 character set
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// -------------------- helper: deterministic key & iv --------------------
// key: SHA256(secret) -> 32 bytes
// iv: first 16 bytes of SHA256(secret + ':iv') -> 16 bytes
function deriveKeyAndIv(secret) {
    const keyHash = CryptoJS.SHA256(secret).toString(CryptoJS.enc.Hex); // 64 hex chars (32 bytes)
    const ivHash = CryptoJS.SHA256(secret + ":iv").toString(CryptoJS.enc.Hex); // 64 hex chars

    const keyWA = CryptoJS.enc.Hex.parse(keyHash);         // 32 bytes
    const ivWA = CryptoJS.enc.Hex.parse(ivHash.slice(0, 32)); // first 16 bytes (32 hex chars)

    return { keyWA, ivWA };
}

// -------------------- helper: WordArray <-> Base62 --------------------
function wordArrayToBase62(wordArray) {
    // convert to hex string
    const hex = CryptoJS.enc.Hex.stringify(wordArray);
    // convert hex -> BigInt -> base62
    let num = BigInt("0x" + hex);
    if (num === 0n) return "0";

    let result = "";
    while (num > 0n) {
        result = BASE62[Number(num % 62n)] + result;
        num = num / 62n;
    }
    return result;
}

function base62ToWordArray(base62) {
    // convert base62 -> BigInt -> hex -> WordArray
    let num = 0n;
    for (let i = 0; i < base62.length; i++) {
        const ch = base62[i];
        const idx = BASE62.indexOf(ch);
        if (idx === -1) throw new Error("Invalid base62 char: " + ch);
        num = num * 62n + BigInt(idx);
    }

    // get hex (without 0x)
    let hex = num.toString(16);
    if (hex.length % 2) hex = "0" + hex; // pad to even length
    return CryptoJS.enc.Hex.parse(hex);
}

// -------------------- encryption / decryption --------------------
export function encryptData(data) {
    try {
        const jsonString = JSON.stringify(data);
        const { keyWA, ivWA } = deriveKeyAndIv(SECRET);

        // Encrypt using AES-256-CBC with derived key & iv
        const encrypted = CryptoJS.AES.encrypt(jsonString, keyWA, {
            iv: ivWA,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // encrypted.ciphertext is a WordArray -> convert to Base62 (alphanumeric only)
        return wordArrayToBase62(encrypted.ciphertext);
    } catch (err) {
        console.warn("Encryption error:", err);
        return null;
    }
}

export function decryptData(encoded) {
    try {
        if (!encoded) return null;
        const ciphertextWA = base62ToWordArray(encoded);
        const { keyWA, ivWA } = deriveKeyAndIv(SECRET);

        // Decrypt: pass object with ciphertext WordArray and provide key+iv
        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: ciphertextWA },
            keyWA,
            {
                iv: ivWA,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );

        const text = decrypted.toString(CryptoJS.enc.Utf8);
        return text ? JSON.parse(text) : null;
    } catch (err) {
        console.warn("Decryption error:", err);
        return null;
    }
}

// -------------------- helpers: endpoint wrappers --------------------
export async function encryptEndpointAndRedirect(url) {
    const token = encryptData({
        url,
        expires_in: new Date(Date.now() + EXPIRE_TIME * 1000).toISOString()
    });

    // token is already base62 (alphanumeric only)
    location.href = APP_ENV === 'production'
        ? `/api/enc__${token}__enc`
        : `/api/${url}`;
}

export async function encryptEndpoint(url) {
    const token = encryptData({
        url,
        expires_in: new Date(Date.now() + EXPIRE_TIME * 1000).toISOString()
    });

    return APP_ENV === 'production'
        ? `/api/enc__${token}__enc`
        : `/api/${url}`;
}