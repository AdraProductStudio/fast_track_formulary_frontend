"use client";

export default function Timeout({ callback, timeout = 0 }) {
    if (!timeout) return null;

    const id = setTimeout(() => {
        callback();
    }, timeout);

    return id; 
}
