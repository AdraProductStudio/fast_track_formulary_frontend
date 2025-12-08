function PartnerAccountDetailsValidation(params) {
    const errors = {};

    if (!params?.first_name || params?.first_name?.trim() === "") {
        errors.first_name = "First Name is required";
    }

    if (!params?.last_name || params?.last_name?.trim() === "") {
        errors.last_name = "Last Name is required";
    }

    if (!params?.designation || params?.designation?.trim() === "") {
        errors.designation = "Designation is required";
    }

    if (!params?.industry?.length) {
        errors.industry = "Industry is required";
    }

    if ((!params?.partner_type?.length)) {
        errors.partner_type = "Organization Type is required";
    }

    if (!params?.website) {
        errors.website = "Website is required";
    }

    if (!params?.location || params?.location?.trim() === "") {
        errors.location = "Location is required";
    }

    if (!params?.contact_number) {
        errors.contact_number = "Contact Number is required";
    }

    return errors;
}


export { PartnerAccountDetailsValidation };