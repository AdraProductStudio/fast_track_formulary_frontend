"use client";

import Icons from "~/public/icons";
import Input from "../Inputs/Input";
import { useCallback } from "react";

export function SearchComponent({ className = "", placeholder = "", value = "", setState = () => { }, onClick = () => { }, clear_search = () => { } }) {

    const searchFun = useCallback(() => {
        if (typeof onClick === "function") onClick(value);
    }, [value]);

    const handleSearchEnter = ((event) => {
        if (event.code === "Enter") searchFun();
    });

    return (
        <div className="position-relative w-100">
            <Input
                type="search"
                className={`search_input ${className}`}
                placeholder={placeholder}
                change={(e) => setState('search_text', e.target.value)}
                keyDown={handleSearchEnter}
                value={value || ''}
            />

            {value ?
                <span className={`${true ? 'cursor-pointer' : 'pe-none'} search_end_icon`} onClick={clear_search}>{Icons.search_cancel_icon}</span>
                :
                <span className="search_end_icon" onClick={searchFun}>{Icons.search_icon}</span>
            }
        </div>
    );

}