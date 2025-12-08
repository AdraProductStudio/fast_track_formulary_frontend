export default function ResetPasswordValidation(params) {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$/;

    if (!params?.email_id || params?.email_id?.trim() === "") {
        errors.email_id = "Email_Id is required";
    } else if (!emailRegex.test(params?.email_id)) {
        errors.email_id = "Invalid email format";
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

    return errors;
}