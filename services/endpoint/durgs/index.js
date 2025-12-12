
"use client";

import drugs_instance from "~/services/axios/drugs_instance";
import show_toast from "~/utils/functions/toast";
import drugsSearchValidation from "~/validate/drugs_Search";

//-----------------------------------------------Search drugs functions------------------------------------------------------//
export async function handle_Search_drugs_func(props) {
    const { errors, updated_search_data } = drugsSearchValidation(props.state);

    if (Object.keys(errors).length) {
        show_toast({ type: 'error', message: errors.join(", ") });
        return;
    }

    try {
        props.setState(prev => ({ ...prev, spinner: true }));
        const res = await drugs_instance.get(`DrugSrch?FormularyID=${updated_search_data.id}&Search=${updated_search_data.search}`);
        const { data } = res;

        if (res.status === 200) props.setState(prev => ({ ...prev, data: data || [] }));
        else console.warn(data?.message || "Something went wrong.")
    }
    catch (error) {
        console.warn(error?.message || "Something went wrong.")
    }
    finally {
        props.setState(prev => ({ ...prev, spinner: false }));
    }
}
