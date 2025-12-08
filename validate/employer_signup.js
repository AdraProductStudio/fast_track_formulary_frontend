function NewEmployerPartnerSignupValidation(params) {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$/;

    if (!params?.email_id || params?.email_id?.trim() === "") {
        errors.email_id = "Email_Id is required";
    } else if (!emailRegex.test(params?.email_id)) {
        errors.email_id = "Invalid email format";
    }

    if (!params?.organization_name || params?.organization_name?.trim() === "") {
        errors.organization_name = "Organization name is required";
    }

    if ((!params?.password || params?.password?.trim() === "")) {
        errors.password = "Password is required";
    } else if (!passwordRegex.test(params?.password)) {
        errors.password = "Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if ((!params?.confirm_password || params?.confirm_password?.trim() === "")) {
        errors.confirm_password = "Confirm Password is required";
    } else if (params.password !== params.confirm_password) {
        errors.confirm_password = "Passwords and Confirm Password does not match";
    }

    if (!params?.terms_and_conditions) {
        errors.terms_and_conditions = 'Accept Terms & Privacy Policy to continue'
    }

    return errors;
}


function EmployerAccountDetailsValidation(params) {
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

    if ((!params?.organization_type?.length)) {
        errors.organization_type = "Organization Type is required";
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


export { NewEmployerPartnerSignupValidation, EmployerAccountDetailsValidation };