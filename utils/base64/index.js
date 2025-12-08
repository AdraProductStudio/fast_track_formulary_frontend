export default function encodeBase64(str) {
    try {
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        console.warn("Failed to encode to Base64:", e);
        return null;
    }
}

export function decodeBase64(base64Str) {
    try {
        return decodeURIComponent(escape(atob(base64Str)));
    } catch (e) {
        console.warn("Failed to decode from Base64:", e);
        return null;
    }
}