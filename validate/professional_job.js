function save_job_validator(params) {
    const errors = {};

    if (!params?.job_id)
        errors.job_id = "Job ID is required";

    return errors;
}

function get_ai_cover_letter_validator(params) {
    const errors = {};

    if (!params?.company_name)
        errors.company_name = "Company Name is required";

    if (!params?.job_title)
        errors.job_title = "Job Title is required";

    if (!params?.country)
        errors.country = "Country is required";

    if (!params?.city)
        errors.city = "City is required";

    if (!params?.job_desc) {
        errors.job_desc = "Job Description is required";
    }

    return errors;
}


function apply_job_validator(params) {
    const errors = {};

    if (params?.required_resume === "Y") {
        if (params?.use_existing_resume) {
            if (!params.user_resume)
                errors.user_resume = "Existing resume is required";
        }
        else {
            if (!params?.resume_file)
                errors.resume = "Resume is required";

            if (!params?.resume_file?.name)
                errors.resume_name = "Resume name is required";
        }
    }

    if (params?.required_cover_letter === "Y")
        if (params?.enable_cover_letter_quill) {
            if (!params?.ai_cover_letter_data)
                errors.ai_cover_letter_data = "AI Cover letter data is required";
        }
        else {
            if (!params?.cover_letter_file)
                errors.cover_letter_file = "Cover letter is required";
        }

    if (!params?.job_id)
        if (isFinite(params?.job_id))
            errors.job_id = "Invalid Job ID";
        else
            errors.job_id = "Job ID is required";

    if (params?.questions?.length)
        params?.questions?.forEach((question, index) => {
            if (!question.answer || question.answer.trim() === "") {
                errors[`question_${index}`] = "Answer is required";
            }
        });


    return errors;
}


export { get_ai_cover_letter_validator, apply_job_validator, save_job_validator };