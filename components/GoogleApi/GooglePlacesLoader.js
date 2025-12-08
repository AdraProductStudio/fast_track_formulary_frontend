"use client";

import { useEffect, useRef, useState } from "react";

export default function GooglePlaceInput({
    value = "",
    onChange,
    onPlaceSelected,
    placeholder = "Enter a location",
    className = "form-control",
    country = null, disabled
}) {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (window.google?.maps?.places) {
            setLoaded(true);
            return;
        }

        const existingScript = document.querySelector(
            'script[src*="maps.googleapis.com/maps/api/js"]'
        );
        if (existingScript) {
            existingScript.addEventListener("load", () => setLoaded(true));
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_URL_GOOGLE_PLACES_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            setLoaded(true);
        };
        script.onerror = () => console.warn("Failed to load Google Maps API");

        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        if (!loaded || !window.google?.maps?.places || !inputRef.current) return;

        const options = { types: ["geocode"] };
        if (country && typeof country === "string") {
            options.componentRestrictions = { country };
        }

        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            onPlaceSelected?.(place);
        });

        autocompleteRef.current = autocomplete;

        return () => {
            window.google.maps.event.clearInstanceListeners(autocomplete);
        };
    }, [loaded, country]);

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            type="text"
            autoComplete="off"
            disabled={disabled}
        />
    );
}
