function NewUserSignupValidation(params) {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$/;

    if (!params?.email_id || params?.email_id?.trim() === "") {
        errors.email_id = "Email_Id is required";
    } else if (!emailRegex.test(params?.email_id)) {
        errors.email_id = "Invalid email format";
    }

    if ((!params?.password || params?.password?.trim() === "") && params?.login_mode === "Manual") {
        errors.password = "Password is required";
    } else if (!passwordRegex.test(params?.password) && params?.login_mode === "Manual") {
        errors.password = "Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if ((!params?.confirm_password || params?.confirm_password?.trim() === "") && params?.login_mode === "Manual") {
        errors.confirm_password = "Confirm Password is required";
    } else if (params.password !== params.confirm_password) {
        errors.confirm_password = "Passwords and Confirm Password does not match";
    }

    if (!params?.terms_and_conditions) {
        errors.terms_and_conditions = 'Accept Terms & Privacy Policy to continue'
    }

    if (!params?.age_verification) {
        errors.age_verification = 'Age verification required'
    }

    return errors;
}

function AboutYouValidation(params) {
    const errors = {};

    if (!params?.first_name || params?.first_name?.trim() === "") {
        errors.first_name = "First Name is required";
    }

    if (!params?.last_name || params?.last_name?.trim() === "") {
        errors.last_name = "Last Name is required";
    }

    if (!params?.location || params?.location?.trim() === "") {
        errors.location = "Location is required";
    }

    if (!params?.contact_number || params?.contact_number?.trim() === "") {
        errors.contact_number = "Contact Number is required";
    }

    return errors;
}

function YourCareerStoryValidation(params) {
    const errors = {}

    if (!params?.years_of_experience) {
        errors.years_of_experience = "Years of Experience is required";
    }

    if (!params?.industry_sector?.length) {
        errors.industry_sector = "Industry Sector is required";
    }

    if (!params?.sector?.length) {
        errors.sector = "Sector is required";
    }

    if (!params?.functional_specification?.length) {
        errors.functional_specification = "Functional Role is required";
    }

    if (!params?.file?.length || !params?.file) {
        errors.file = "Resume is required";
    }

    return errors;
}

function YourNextChapterValidation(params) {
    const errors = {}

    if (!params?.job_type?.length) {
        errors.job_type = "Job Type required";
    }

    if (!params?.location_preference?.length) {
        errors.location_preference = "Work Location Preference required";
    }

    if (!params?.willing_to_relocate?.length) {
        errors.willing_to_relocate = "Willing to Relocate required";
    }

    if (!params?.mode_of_communication?.length) {
        errors.mode_of_communication = "Mode of Communication with 2nd Careers required";
    }

    if (params?.mode_of_communication?.length) {
        if (params?.mode_of_communication[0]?.label === "Others" && !params?.mode_of_communication_others?.trim()) {
            errors.mode_of_communication_others = "Mode of Communication with 2nd Careers required";
        }
    }

    return errors;
}

function DeleteCareerStoryResumeValidation(params) {
    let errors = {};

    if (!params?.file?.length) {
        errors.file = "Resume is required";
    }

    if (!params?.email_id) {
        errors.email_id = "Email ID is required";
    }

    return errors;
}

export { NewUserSignupValidation, AboutYouValidation, YourCareerStoryValidation, YourNextChapterValidation, DeleteCareerStoryResumeValidation };