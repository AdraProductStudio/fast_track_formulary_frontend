import toast from "react-hot-toast";

export default function show_toast({ message, type = "info", duration = 3000, timeout = 0 }) {
    const allowd_toast_types = ["success", "error", "info", "loading"];

    if (allowd_toast_types.includes(type)) {
        if (timeout) {
            setTimeout(() => {
                toast[type](message, {
                    duration: duration,
                    position: "top-center",
                    onClose: () => {
                        toast.dismiss();
                    },
                })
            }, timeout);
            return
        }

        toast[type](message, {
            duration: duration,
            position: "top-center",
            onClose: () => {
                toast.dismiss();
            },
        });
    } else {
        toast.error(`Invalid toast type: ${type}`, {
            duration: duration,
            position: "top-center",
            onClose: () => {
                toast.dismiss();
            },
        });
    }
}