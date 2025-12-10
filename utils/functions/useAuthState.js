import { useState } from "react";

export function useAuthState(initialState = {}, initialErrors = {}) {
    const [state, setState] = useState(initialState);
    const [errors, set_errors] = useState(initialErrors);

    function setStateFun(field, value) {
        // remove the field from errors if it exists
        if (errors[field]) {
            const newErrors = { ...errors };
            delete newErrors[field];
            set_errors(newErrors);
        }

        // update the main state
        setState((prev) => ({ ...prev, [field]: value }));
    }

    return { state, errors, set_errors, setStateFun, setState };
}
