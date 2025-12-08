"use client";
import { useState } from "react";


export function useJobState(initialState = {}) {
    const [state, setState] = useState(initialState);

    function setStateFun(field, value) {
        setState((prev) => ({ ...prev, [field]: value }));
    }

    return { state, setStateFun, setState };
}