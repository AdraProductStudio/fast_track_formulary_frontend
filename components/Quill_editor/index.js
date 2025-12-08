"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value = '', onChange = () => { } }) {
    const { quill, quillRef } = useQuill({
        theme: "snow",
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
            ],
        },
    });

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                const html = quill.root.innerHTML;
                onChange && onChange(html);
            });

            if (value && quill.root.innerHTML !== value) {
                quill.root.innerHTML = value;
            }
        }
    }, [quill, value]);

    return <div ref={quillRef} style={{ minHeight: 200 }} />;
}
