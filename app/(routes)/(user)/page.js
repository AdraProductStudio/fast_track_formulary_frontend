"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useCallback, useEffect } from "react";
import { AsyncSearchComponent } from "~/components/Async_type_head";
import { handle_Search_autocomplete_func } from "~/services/endpoint/durgs";
import { encryptData } from "~/utils/crypto";
import ButtonComponent from "~/components/Button/Button";
import Icons from "~/public/icons";
import drugsSearchValidation from "~/validate/drugs_Search";
import show_toast from "~/utils/functions/toast";

const suggestionList = Array(8).fill({
    drug: "Paracetamol 500 mg",
    formulary: "Formulary: Anti-Addiction Agents · Gold"
});

export default function SearchMedicine() {
    const router = useRouter();
    const typeaheadRef = useRef(null);
    const [data, setData] = useState({});
    const scrollTimeoutRef = useRef(null);

    const isMobile = useCallback(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(max-width: 768px)").matches;
    }, []);

    const scrollToInput = useCallback(() => {
        if (!isMobile()) return;

        const input = typeaheadRef.current?.inputNode || typeaheadRef.current?.getInput?.();
        if (!input) return;

        if (scrollTimeoutRef.current)
            clearTimeout(scrollTimeoutRef.current);

        input.offsetHeight;
        const rect = input.getBoundingClientRect();
        const targetScroll = Math.max(window.scrollY + rect.top - 15, 0);

        window.scrollTo({ top: targetScroll, behavior: 'auto' });
        requestAnimationFrame(() => { window.scrollTo({ top: targetScroll, behavior: 'smooth' }) });

        scrollTimeoutRef.current = setTimeout(() => {
            const finalRect = input.getBoundingClientRect();
            const finalTarget = Math.max(window.scrollY + finalRect.top - 15, 0);
            window.scrollTo({ top: finalTarget, behavior: 'auto' });
        }, 10);
    }, []);

    const handleFocus = useCallback(() => { requestAnimationFrame(scrollToInput); }, [scrollToInput]);

    const handleBlur = useCallback(() => {
        if (scrollTimeoutRef.current)
            clearTimeout(scrollTimeoutRef.current);
    }, []);

    function handle_suggestion_search(suggestion) {
        return
        setData(prev => ({ ...prev, selected_search_text: [{ label: suggestion }] }));

        requestAnimationFrame(() => {
            scrollToInput();
            setTimeout(() => { typeaheadRef.current?.focus() }, 50);
        });

        handle_Search_autocomplete_func({ value: suggestion, setState: setData, });
    }

    function searchFun() {
        const { errors } = drugsSearchValidation(data?.selected_search_text || {});
        if (Object.keys(errors).length)
            return show_toast({ type: 'error', message: errors })

        router.push(`/${encryptData({
            search_text: {
                formularyId: data?.selected_search_text?.['drug']?.formularyId || "",
                label: data?.selected_search_text?.['drug']?.label || ""
            }
        })}`);
    }

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current)
                clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    return (
        <div className="h-100 med_search_page">
            <div className="card custom_card_shadow">
                <div className="card-body med_search_page_content py-0">
                    <h5 className="title_two">MedSearch</h5>
                    <p className="para_three">
                        Find cost-effective medication alternatives
                    </p>

                    <div className="mobile_responsive_card" tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
                        <div className="mobile_responsive_card_body">
                            <h6 className="d-xl-none">Search Area</h6>
                            <AsyncSearchComponent ref={typeaheadRef} state={data} setState={setData} />

                            {Object.keys(data?.selected_search_text || {}).length > 0 && (
                                <>
                                    <div className="para_three mt-2 d-flex align-items-center">
                                        Selected Combination
                                        <hr className="w-50 taper_hr ms-2 text-primary" />
                                    </div>

                                    <div className="row g-2">
                                        {Object.entries(data?.selected_search_text || {}).map(([key, value]) => (
                                            <div className="col-12 col-xl-6" key={key}>
                                                <div className="selected_combo_card d-flex flex-wrap">
                                                    <div className="col-10">
                                                        {key?.toUpperCase()}: {value?.label?.length > 30 ? value?.label?.slice(0, 30) + "…" : value.label}
                                                    </div>

                                                    <div className="col text-end">
                                                        <ButtonComponent className="p-0 border-0 bg-transparent" onClick={() => {
                                                            let updated_selection = { ...data?.selected_search_text || {} };
                                                            delete updated_selection[key];

                                                            setData(prev => ({ ...prev, selected_search_text: updated_selection }));
                                                        }}>
                                                            {Icons.close_icon}
                                                        </ButtonComponent>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <ButtonComponent className="btn_brand_color w-100 mt-3" onClick={searchFun}>
                                Search Medication
                            </ButtonComponent>
                        </div>
                    </div>

                    <div className="med_wuick_search">
                        <h6 className="my-4">
                            Recent Searchs
                        </h6>

                        <div className="mobile_responsive_last_search_card">
                            <div className="mobile_responsive_last_search_card_body">
                                <div className="para_three d-flex align-items-center my-2">
                                    Last Search
                                    <hr className="w-50 taper_hr ms-2 text-primary" />
                                </div>
                                <div className="search_suggestions px-3">
                                    {suggestionList.map((suggestion, index) => (
                                        <div key={index} className="d-flex flex-wrap my-2 cursor_pointer" onClick={() => handle_suggestion_search(suggestion)}>
                                            <div className="text-center pe-2">
                                                {Icons.suggestion_left_side_icon}
                                            </div>
                                            <div className="col">
                                                <h5 className="ps-2 suggestion_list_content">
                                                    {suggestion?.drug}
                                                </h5>
                                                <p className="ps-2 suggestion_list_content">
                                                    {suggestion?.formulary}
                                                </p>
                                            </div>
                                            <div className="col-1 text-center">
                                                {Icons.suggestion_arrow}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}