export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const pdfUrl = searchParams.get("url");

    if (!pdfUrl) {
        return new Response("Missing url", { status: 400 });
    }

    const pdfResponse = await fetch(pdfUrl);
    return new Response(pdfResponse.body, {
        headers: {
            "Content-Type": "application/pdf",
            "Access-Control-Allow-Origin": "*",
        }
    });
}