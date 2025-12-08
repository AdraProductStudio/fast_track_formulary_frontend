export default function ForgotPasswordValidation(params) {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!params.email_id || params.email_id.trim() === "") {
        errors.email_id = "Email_Id is required";
    } else if (!emailRegex.test(params.email_id)) {
        errors.email_id = "Invalid email format";
    }

    return errors;
}