"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonComponent from "~/components/Button/Button";
import { SearchComponent } from "~/components/Search";
import Icons from "~/public/icons";
import show_toast from "~/utils/functions/toast";

const suggestionList = [
    "Praluent, Blue cross, standard Formulary",
    "Praluent, United Healthcare, standard Formulary",
    "Praluent, Aetna, standard Formulary",
    "Praluent, Cigna, standard Formulary",
    "Praluent, Humana, standard Formulary",
]

export default function LoginScreen() {
    const router = useRouter();
    const [data, setData] = useState({})

    function setDataFun(key, value) { setData(prev => ({ ...prev, [key]: value })) }
    function clear_search_fun() { setData(prev => ({ ...prev, search_text: "" })) }

    function handle_suggestion_search(suggestion) {
        setDataFun('search_text', suggestion.target.innerText)
    }

    function searchFun() {
        if (!data?.search_text)
            return show_toast({ type: 'error', message: 'Please enter search text' })

        console.log("searching for ", data?.search_text);
        router.push(`/search_details`)
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
                        <SearchComponent
                            className="med_search_input"
                            placeholder="Enter medication name, insurance, and formulary..."
                            value={data?.search_text || ""}
                            setState={setDataFun}
                            clear_search={clear_search_fun}
                            onClick={searchFun}
                        />
                        <p className="para_three mt-3">Example:"Praluent, Blue cross, standard Formulary" or just "praluent"</p>
                    </div>

                    <ButtonComponent className="w-100 btn_brand_color" onClick={searchFun}>
                        Search Medications
                    </ButtonComponent>

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