import show_toast from "./toast";

export default function copyToClipboard(text) {
    if (navigator.clipboard) {
        show_toast({ type: 'success', message: 'copied to clipboard!' })
        return navigator.clipboard.writeText(text);
    }
    else
        show_toast({ type: 'error', message: 'Failed to copy' })
}