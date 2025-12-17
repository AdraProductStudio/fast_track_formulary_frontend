
"use client";

import search_instance from "~/services/axios/search_instance";
import show_toast from "~/utils/functions/toast";
import drugsSearchValidation from "~/validate/drugs_Search";

//-----------------------------------------------Search auto complete functions------------------------------------------------------//
export async function handle_Search_autocomplete_func(props) {
    props.setState(prev => ({ ...prev, spinner: true, search_text: props?.value || "" }));
    try {
        const { data } = await search_instance.post(`auto_complete`, { search_text: props?.value || "" });

        if (data.error_code === 200)
            props.setState(prev => ({ ...prev, search_text_options: data?.data || [] }));
        else {
            props.setState(prev => ({ ...prev, search_text_options: [] }));
            console.warn(data?.message || "Something went wrong.")
        }
    }
    catch (error) {
        console.warn(error?.message || "Something went wrong.")
    }
    finally {
        props.setState(prev => ({ ...prev, spinner: false }));
    }
}


//-----------------------------------------------Search drugs functions------------------------------------------------------//
export async function handle_Search_drugs_func(props) {
    const search_data = props?.state?.search_text || {};
    const { errors } = drugsSearchValidation(search_data);

    if (Object.keys(errors).length) {
        show_toast({ type: 'error', message: errors.join(", ") });
        return;
    }

    props.setState(prev => ({ ...prev, spinner: true, data: {} }));
    try {
        const { data } = await search_instance.post(`search`, {
            formulary_id: search_data?.formularyId || "",
            search_text: search_data?.label || "",
        });

        if (data.error_code === 200) {
            let selected_primary_drug = props?.state?.selected_primary_drug || {};
            let selected_primary_drug_data = {};
            if (selected_primary_drug)
                selected_primary_drug_data = data?.data?.primary?.results?.find(item => item?.drugId === selected_primary_drug) || {};

            props.setState(prev => ({ ...prev, data: data?.data || {}, selected_primary_drug_data: selected_primary_drug_data }));
        }
        else console.warn(data?.message || "Something went wrong.")
    }
    catch (error) {
        console.warn(error?.message || "Something went wrong.")
    }
    finally {
        props.setState(prev => ({ ...prev, spinner: false }));
    }
}
