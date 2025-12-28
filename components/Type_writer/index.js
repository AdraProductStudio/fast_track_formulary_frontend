import { useEffect, useState } from "react";

export function useRunningPlaceholder(words, speed = 80, holdDelay = 1200) {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout;

        if (!isDeleting && text.length < currentWord.length) {
            // typing
            timeout = setTimeout(() => {
                setText(currentWord.slice(0, text.length + 1));
            }, speed);
        }
        else if (!isDeleting && text.length === currentWord.length) {
            // hold after typing
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, holdDelay);
        }
        else if (isDeleting && text.length > 0) {
            // deleting (same speed)
            timeout = setTimeout(() => {
                setText(currentWord.slice(0, text.length - 1));
            }, speed);
        }
        else if (isDeleting && text.length === 0) {
            // next word
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words, speed, holdDelay]);

    return text;
}
