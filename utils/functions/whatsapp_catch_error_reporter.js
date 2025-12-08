import axios from "axios";

export async function send_whatsapp_error({ user_data = {}, body = {}, alert_type = "", status = "", endpoint = "", method = "", role = "", data = {}, error = "" }) {
    try {
        await axios.post("/api/catch_error_reporter", {
            user_data, alert_type, status, body,
            endpoint, method,
            role, data, error,
        });
    } catch (err) {
        console.warn("Failed to send WhatsApp error", err);
    }
}