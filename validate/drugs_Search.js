export default function drugsSearchValidation(params) {
    const errors = [];
    const [id = "", search = ""] = (params?.search_text || "").split(",").map(s => s.trim());

    if (id || search) {
        if (!id)
            errors.push("Formulary id");

        if (!search)
            errors.push("Search text");

        if (!id && !search)
            errors.push("is required");
    }

    if (!id && !search)
        errors.push("Search text must be in format: id, search");

    params.search_data = { id, search };

    return { errors, updated_search_data: params.search_data };
}
