import { NextResponse } from "next/server";
import twilio from "twilio";

// --- Split message into 1500-char chunks (Twilio max = 1600) ---
function splitMessage(text, limit = 1500) {
    const parts = [];
    for (let i = 0; i < text.length; i += limit) {
        parts.push(text.slice(i, i + limit));
    }
    return parts;
}

export async function POST(req) {
    let numbers = process.env.NEXT_PUBLIC_URL_TWILIO_WHATSAPP_TO;

    if (process.env.NEXT_PUBLIC_URL_ENABLE_WHATSAPP_ERROR_REPORTER !== "true") {
        return NextResponse.json({ message: "WhatsApp Error Reporter is disabled" }, { status: 200 });
    }

    if (!numbers) {
        return NextResponse.json({ message: "Env NEXT_PUBLIC_URL_TWILIO_WHATSAPP_TO is missing" }, { status: 200 });
    }

    try {
        const json_data = await req.json();
        const {
            user_data = "",
            alert_type = "",
            body = {},
            status = "",
            endpoint = "",
            method = "",
            role = "",
            data = {},
            error = "",
            time = new Date().toLocaleString()
        } = json_data;

        const accountSid = process.env.NEXT_PUBLIC_URL_TWILIO_SID;
        const authToken = process.env.NEXT_PUBLIC_URL_TWILIO_AUTH;
        const client = twilio(accountSid, authToken);

        const messageBody = `
*MESSAGE FROM 2ND CAREERS - ERROR REPORTER*

${alert_type}

*Endpoint:* ${endpoint}
*Method:* ${method}
*Status:* ${status}
*Role:* ${role || "N/A"}
*Time:* ${time}

*User Data:* ${JSON.stringify(user_data)}

*Request Body:* ${JSON.stringify(body)}

*Response:* ${JSON.stringify(data)}

*Error:* ${error}
        `.trim();

        // Parse numbers (string → array)
        if (typeof numbers === "string") {
            try {
                numbers = JSON.parse(numbers); // ["whatsapp:+91...", ...]
            } catch {
                numbers = numbers.split(",").map(n => n.trim());
            }
        }

        console.log("Sending WhatsApp message to:", numbers);

        // ---- SEND IN MULTIPLE PARTS ----
        const messageParts = splitMessage(messageBody);
        
        await Promise.all(
            numbers.map(async admin_num => {
                for (const part of messageParts) {
                    await client.messages.create({
                        from: process.env.NEXT_PUBLIC_URL_TWILIO_WHATSAPP_FROM,
                        to: admin_num,
                        body: part
                    });
                }
            })
        );

        return NextResponse.json({ message: "Sent" }, { status: 200 });

    } catch (err) {
        console.warn("WhatsApp send error", err);
        return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 500 });
    }
}