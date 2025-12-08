"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function PdfViewer({ fileUrl }) {
    const plugin = defaultLayoutPlugin();

    if (!fileUrl) {
        return <div>No PDF file URL provided.</div>
    }

    let finalUrl = null;

    // CASE 1: Blob or File → convert to object URL
    if (fileUrl instanceof Blob) {
        finalUrl = URL.createObjectURL(fileUrl);
    }

    // CASE 2: ArrayBuffer → convert to Blob → URL
    else if (fileUrl instanceof ArrayBuffer) {
        const blob = new Blob([fileUrl], { type: "application/pdf" });
        finalUrl = URL.createObjectURL(blob);
    }

    // CASE 3: URL string (http / https)
    else if (typeof fileUrl === "string" && (fileUrl.startsWith("http") || fileUrl.startsWith("https"))) {
        finalUrl = `/api/pdf_proxy?url=${encodeURIComponent(fileUrl)}`;
    }

    // CASE 4: string local file (public folder)
    else if (typeof fileUrl === "string") {
        finalUrl = fileUrl;
    }
    return (
        <div style={{ height: "100vh" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={finalUrl} plugins={[plugin]} />
            </Worker>

            <style jsx global>{`
                /* Hide sidebar toggle button */
                .rpv-default-layout__toolbar .rpv-default-layout__sidebar-button {
                    display: none !important;
                }

                /* Hide print button */
                .rpv-default-layout__toolbar .rpv-default-layout__print-button {
                    display: none !important;
                }

                /* Hide "more actions" button */
                .rpv-default-layout__toolbar .rpv-default-layout__more-actions-button {
                    display: none !important;
                }

                /* Hide open file button */
                .rpv-default-layout__toolbar .rpv-default-layout__open-file-button {
                    display: none !important;
                }

                /* Hide dark/light mode toggle */
                .rpv-default-layout__toolbar .rpv-default-layout__switch-theme-button {
                    display: none !important;
                }

                /* Hide full-screen button */
                .rpv-default-layout__toolbar .rpv-core__toolbar-button--full-screen {
                    display: none !important;
                }

                /* Hide the popovers/tooltips */
                [aria-describedby="rpv-core__tooltip-body-theme-switch"],
                [aria-describedby="rpv-core__tooltip-body-open"],
                [aria-describedby="rpv-core__tooltip-body-full-screen-enter"],
                [aria-describedby="rpv-core__tooltip-body-print"],
                [aria-controls="rpv-core__popver-body-toolbar-more-actions"] {
                    display: none !important;
                }

                /* Hide sidebar panel */
                .rpv-default-layout__sidebar {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
