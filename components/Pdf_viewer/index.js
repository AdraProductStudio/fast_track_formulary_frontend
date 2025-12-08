"use client";

import dynamic from "next/dynamic";

// Use dynamic import with ssr: false
export const PdfViewer = dynamic(() => import("./PdfViewerInner"), { ssr: false });
