export default function drugsSearchValidation(params) {
    const errors = [];
    const validatedData = [];
  
    const list = Array.isArray(params?.search_text)
      ? params.search_text
      : [];
  
    list.forEach((item, index) => {
        console.log(item,"itemfrom")
      const id = String(item?.id ?? "").trim();
      const search = (item?.name || "").trim();
  
      const itemErrors = [];
  
      if (!id) itemErrors.push("Formulary id is required");
      if (!search) itemErrors.push("Search text is required");
  
      if (itemErrors.length) {
        errors.push({
          index,
          errors: itemErrors,
        });
      }
  
      validatedData.push({ id, search });
    });
  
    params.search_data = validatedData;
  
    return {
      errors,
      updated_search_data: validatedData,
    };
  }
  