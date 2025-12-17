"use client"

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AsyncSearchComponent } from "~/components/Async_type_head"
import Icons from "~/public/icons";
import { handle_Search_autocomplete_func } from "~/services/endpoint/durgs";
import { encryptData } from "~/utils/crypto";
import drugsSearchValidation from "~/validate/drugs_Search";

const suggestionList = ["Aspirin"]

export default function SearchMedicine() {
    const router = useRouter();
    const typeaheadRef = useRef(null);
    const [data, setData] = useState({})

    function handle_suggestion_search(suggestion) {
        setData(prev => ({ ...prev, selected_search_text: [{ label: suggestion.target.innerText }] }))
        requestAnimationFrame(() => { typeaheadRef.current?.focus() });
        handle_Search_autocomplete_func({ value: suggestion.target.innerText, setState: setData })
    }

    function searchFun(search_data) {
        const { errors } = drugsSearchValidation(search_data);
        if (Object.keys(errors).length) return;

        router.push(`/${encryptData({ search_text: { formularyId: search_data?.formularyId || "", label: search_data?.label || "" } || {} })}`)
    }

    return (
        <div className="h-100 med_search_page">
            <div className="card custom_card_shadow">
                <div className="card-body med_search_page_content">
                    <div className="text-center">
                        <h5 className="title_one">MedSearch</h5>
                        <p className="para_three">Find cost-effective medication alternatives</p>
                    </div>

                    <div className="py-3 text-center">
                        <AsyncSearchComponent
                            ref={typeaheadRef}
                            className="med_search_input"
                            placeholder="Enter medication name, insurance, and formulary..."
                            state={data}
                            setState={setData}
                            onClick={searchFun}
                        />
                    </div>

                    <div className="med_wuick_search mt-4">
                        <div className="para_three mb-2">
                            Quick Searches
                            <hr className="w-25 taper_hr ms-2 text-primary align-middle" />
                        </div>

                        <div className="search_suggestions">
                            {suggestionList.map((suggestion, index) => (
                                <div className="d-flex flex-wrap my-2 cursor_pointer" key={index} onClick={handle_suggestion_search}>
                                    <div className="col-1 text-center">
                                        {Icons.suggestion_arrow}
                                    </div>
                                    <p className="col ps-2 suggestion_list_content">{suggestion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}