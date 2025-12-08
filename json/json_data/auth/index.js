"use client";
import { useState } from "react";
import Icons from "~/public/icons"
import { Images } from "~/public/image";
import { handle_delete_your_career_story_resume } from "~/services/auth";

export const auth_json = {
    status_messages: {
        // ✅ SUCCESS (2xx)
        // 200: "*✅ Success ✅* OK",
        // 201: "*✅ Success ✅* Created",
        // 204: "*✅ Success ✅* No Content",

        // ⚠️ CLIENT ERRORS (4xx)
        400: "*⚠️ Warning ⚠️* Bad Request",
        // 401: "*⚠️ Warning ⚠️* Unauthorized",
        403: "*⚠️ Warning ⚠️* Forbidden",
        405: "*⚠️ Warning ⚠️* Method Not Allowed",
        404: "*⚠️ Warning ⚠️* Not Found",
        408: "*⚠️ Warning ⚠️* Request Timeout",

        429: "*⚠️ Warning ⚠️* Too Many Requests",

        // 🚨 SERVER ERRORS (5xx)
        500: "*🚨 SERVER ERROR ALERT 🚨* Internal Server Error",
        501: "*🚨 SERVER ERROR ALERT 🚨* Not Implemented",
        502: "*🚨 SERVER ERROR ALERT 🚨* Bad Gateway",
        503: "*🚨 SERVER ERROR ALERT 🚨* Service Unavailable",
        504: "*🚨 SERVER ERROR ALERT 🚨* Gateway Timeout"
    },


    signin_buttons: [
        { buttonName: "Gmail", image: Images.gmail_image, callback: "" },
        { buttonName: "Linkedin", image: "https://devcdn.2ndcareers.com/linkedin.png", callback: "" },
        { buttonName: "Apple", image: "https://devcdn.2ndcareers.com/apple.png", callback: "" }
    ],
    signup_buttons: [
        { buttonName: "Gmail", image: Images.gmail_image, callback: "" },
        { buttonName: "Linkedin", image: "https://devcdn.2ndcareers.com/linkedin.png", callback: "" },
        { buttonName: "Apple", image: "https://devcdn.2ndcareers.com/apple.png", callback: "" }
    ],
    role_selection: [
        { title: "Professional", image: Images.role_professional, content: "Empowering experienced professionals with fulfilling opportunities.", link: "/role_selection/professional_signup/new_user_signup" },
        { title: "Employer", image: Images.role_employer, content: "Enabling enterprises, start-ups, and NGOs to find curated, experienced talent", link: "/role_selection/employer_signup/new_user_signup" },
        { title: "Partner", image: Images.role_partner, content: "Building partnerships for skill development, recruitment and coaching.", link: "/role_selection/partner_signup/new_user_signup" }
    ],

    // professional layout settings 
    professional_steps: [
        { number: 1, title: "New User Signup", path: "/role_selection/professional_signup/new_user_signup", status: 'new_user_signup' },
        { number: 2, title: "About You", path: "/role_selection/professional_signup/about_you", status: 'about_you' },
        { number: 3, title: "Your Career Story", path: "/role_selection/professional_signup/your_career_story", status: 'your_career_story' },
        { number: 4, title: "Your Next Chapter", path: "/role_selection/professional_signup/your_next_chapter", status: 'your_next_chapter' },
    ],
    professional_progress_map: {
        "/role_selection/professional_signup/new_user_signup": 13,
        "/role_selection/professional_signup/about_you": 36,
        "/role_selection/professional_signup/your_career_story": 63,
        "/role_selection/professional_signup/your_next_chapter": 88,
        "/role_selection/professional_signup/signup_success": 100
    },
    professional_page_img_contents: [
        { path: "/role_selection/professional_signup/new_user_signup", image: Images.new_user_signup, content: 'Myth: Startups hire only youth. Truth: Investors favour seasoned professionals in strategic roles.' },
        { path: "/role_selection/professional_signup/about_you", image: Images.about_you, content: 'Your network is your asset. Grow it, nurture it, and it shall pay rich dividends over time.' },
        { path: "/role_selection/professional_signup/your_career_story", image: Images.career_story, content: 'Begin small and build up. Identify the dimensions you want to explore - be it learning, income, or impact.' },
        { path: "/role_selection/professional_signup/your_next_chapter", image: Images.your_next_chapter, content: 'In a market that feels uncertain, one thing is always in your control - your narrative. What story are you telling about yourself?' }
    ],
    employer_page_img_contents: [
        { path: "/role_selection/employer_signup/new_user_signup", image: Images.new_user_signup, content: 'Explore future of work models with diverse skills and proven expertise' },
    ],
    partner_page_img_contents: [
        { path: "/role_selection/partner_signup/new_user_signup", image: Images.new_user_signup, content: 'Extend, pivot or restart professional journeys with confidence and support' },
    ],

    // signup select box options data's
    register_job_type: [
        { value: 1, label: "Full-time" },
        { value: 2, label: "Part-time" },
        { value: 3, label: "Consulting" },
        { value: 4, label: "Advisory" },
        { value: 5, label: "Volunteering" }
    ],
    location_preference: [
        { value: 1, label: "Remote" },
        { value: 2, label: "Hybrid" },
        { value: 3, label: "In-person" }
    ],
    willing_to_relocate: [
        { value: 1, label: "Yes" },
        { value: 2, label: "No" }
    ],
    gender: [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" }
    ],
    functional_specialization: [
        { value: 1, label: "Academia,Research", disabled: false },
        { value: 2, label: "Administration, Office Management", disabled: false },
        { value: 3, label: "C suite,Board", disabled: false },
        { value: 4, label: "Consulting, Advisory", disabled: false },
        { value: 5, label: "Finance, Accounting", disabled: false },
        { value: 6, label: "Governance, Risk, Compliance", disabled: false },
        { value: 7, label: "Human Resources", disabled: false },
        { value: 8, label: "Legal, Government Affairs, Policy", disabled: false },
        { value: 9, label: "Life sciences, Biotech, Medical", disabled: false },
        { value: 10, label: "Logistics, Supply chain, Operations", disabled: false },
        { value: 11, label: "Manufacturing, Engineering, Quality", disabled: false },
        { value: 12, label: "Marketing, PR, Communications", disabled: false },
        { value: 13, label: "Project Management", disabled: false },
        { value: 14, label: "Sales, Business Development", disabled: false },
        { value: 15, label: "Social Sector Development", disabled: false },
        { value: 16, label: "Sustainability & ESG", disabled: false },
        { value: 17, label: "Technology, Technology Management", disabled: false }

    ],
    organization_type: [
        { value: 1, label: "Large (5000+ employees)" },
        { value: 2, label: "Medium (1001 - 5000 employees)" },
        { value: 3, label: "Small (251 - 1000 employees)" },
        { value: 4, label: "Startup (0 - 250 employees)" },
        { value: 5, label: "Non-Profit" }
    ],
    partner_type: [
        { value: 1, label: "Assessment company", },
        { value: 2, label: "Coaching and mentoring firm", },
        { value: 3, label: "Learning and Development Organization", },
        { value: 4, label: "Others", },
        { value: 5, label: "Search firm", },
        { value: 6, label: "Skill platform", },
    ],
    sectors: [
        { value: 1, label: "Academia", disabled: false },
        { value: 2, label: "Corporate", disabled: false },
        { value: 3, label: "Non-profit", disabled: false },
        { value: 4, label: "Startup", disabled: false },
        { value: 5, label: "Others", disabled: false },
    ],
    industry_sector: [
        { value: 1, label: "Agriculture", disabled: false },
        { value: 2, label: "Construction & Engineering", disabled: false },
        { value: 3, label: "Consumer Goods", disabled: false },
        { value: 4, label: "Corporate Services", disabled: false },
        { value: 5, label: "Design", disabled: false },
        { value: 6, label: "Education", disabled: false },
        { value: 7, label: "Energy, Mining", disabled: false },
        { value: 8, label: "Entertainment", disabled: false },
        { value: 9, label: "Finance", disabled: false },
        { value: 10, label: "Government", disabled: false },
        { value: 11, label: "Hardware, Networking", disabled: false },
        { value: 12, label: "Health Care", disabled: false },
        { value: 13, label: "Hospitality, Travel", disabled: false },
        { value: 14, label: "Legal", disabled: false },
        { value: 15, label: "Manufacturing", disabled: false },
        { value: 16, label: "Media, Communications", disabled: false },
        { value: 17, label: "Non-Profit", disabled: false },
        { value: 18, label: "Professional Services", disabled: false },
        { value: 19, label: "Real Estate", disabled: false },
        { value: 20, label: "Retail", disabled: false },
        { value: 21, label: "Software, IT Services", disabled: false },
        { value: 22, label: "Transportation, Logistics", disabled: false },
        { value: 23, label: "Wellness, Fitness", disabled: false }
    ],
    mode_of_communication: [
        { value: 1, label: "Email", disabled: false },
        { value: 2, label: "Whatsapp", disabled: false },
        { value: 3, label: "Text message", disabled: false },
        { value: 4, label: "Phone", disabled: false },
        { value: 5, label: "Others", disabled: false },
    ],

    // registration steps
    professional_registration_steps: ['new_user_signup', 'about_you', 'your_career_story', 'your_next_chapter'],
    employer_registration_steps: ['new_user_signup', 'employer_account_details'],
    partner_registration_steps: ['new_user_signup', 'partner_account_details'],

    signup_success_page_management: {
        professional_signup: {
            redirect_path: "/professional/home",
            from: 'professional',
            pro_tips: 'professional_signup_success',
            must_complete_upto: 'your_next_chapter',
            must_complete_not_satisfied_redirect: '/role_selection/professional_signup/new_user_signup'
        },
        employer_signup: {
            redirect_path: "/employer/home",
            from: 'employer',
            pro_tips: 'employer_signup_success',
            must_complete_upto: 'employer_account_details',
            must_complete_not_satisfied_redirect: '/role_selection/employer_signup/new_user_signup'
        },
        partner_signup: {
            redirect_path: "/partner/home",
            from: 'partner',
            pro_tips: 'partner_signup_success',
            must_complete_upto: 'partner_account_details',
            must_complete_not_satisfied_redirect: '/role_selection/partner_signup/new_user_signup'
        }
    },

    //prop tips
    professional_signup_success: [
        { title: "Complete Your Profile", content: "Add a professional photo and detailed bio to increase profile views by 80%" },
        { title: "Build your brand", content: "Comment on posts and share insights to boost your professional visibility" },
        { title: "Create your career pathway", content: "Use our goal-setting feature to track your career milestones and progress" },
    ],
    employer_signup_success: [
        { title: "Complete Your Profile", content: "Add your organization details and logo to increase job views by 80%" },
        { title: "Future proof your org", content: "Search our curated talent pool for a workforce prepared for tomorrow’s challenges" },
        { title: "Discover faster profile matches", content: "Use our AI-Powered Best Fit recommendations for improved workflow efficiency" },
    ],
    partner_signup_success: [
        { title: "Complete Your Profile", content: "Add your organization details and logo to increase job views by 80%" },
        { title: "Engage actively", content: "Comment on posts and share insights to boost your professional services visibility" },
        { title: "Respect data privacy", content: "Follow user data and privacy requirements of the platform" }
    ],
}

export default function useAuthUi({ state = {}, setState = () => { }, keyDownHandler = () => { }, errors = {}, set_errors = () => { } }) {
    const [modeOfCommOptions, set_mode_of_communication] = useState(auth_json?.mode_of_communication || []);
    const [sectors, set_sectors] = useState(auth_json?.sectors || []);

    const jsx = {
        login: [
            {
                category: "input",
                type: "input_group",
                input_type: "text",
                title: "Email",
                name: "email",
                autoComplete: "email",
                placeholder: "Enter your email id",
                parent_style: "w-100 mb-3",
                child_style: "w-100",
                labelClassName: "text_auth_input_label",
                value: state?.email_id || "",
                is_mandatory: true,
                Err: errors?.email_id || "",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            },
            {
                category: "input",
                type: "input_group",
                input_type: "password",
                title: "Password",
                name: "password",
                autoComplete: "set password",
                placeholder: "Enter your password",
                parent_style: "w-100 mb-2",
                child_style: "",
                labelClassName: "text_auth_input_label",
                value: state?.password || "",
                is_mandatory: true,
                Err: errors?.password || "",
                onChange: (e) => setState("password", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            }
        ],

        forgot_password: [
            {
                category: "input",
                type: "input_group",
                input_type: "text",
                icon: Icons.email_icon,
                autoComplete: "email",
                placeholder: "Enter your email id",
                parent_style: "w-100 mb-3",
                value: state?.email_id || "",
                is_mandatory: true,
                Err: errors?.email_id || "",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            }
        ],

        reset_password: [
            {
                category: "input",
                type: "input_group",
                input_type: "text",
                icon: Icons.email_icon,
                autoComplete: "email",
                placeholder: "Enter your email id",
                parent_style: "w-100 mb-3",
                value: state?.email_id || "",
                is_mandatory: true,
                Err: errors?.email_id || "",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                disabled: true
            },
            {
                category: "input",
                type: "input_group",
                input_type: "password",
                icon: Icons.lock_icon,
                autoComplete: "set password",
                placeholder: "New password",
                parent_style: "w-100 mb-3",
                value: state?.password || "",
                is_mandatory: true,
                Err: errors?.password || "",
                onChange: (e) => setState("password", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            },
            {
                category: "input",
                type: "input_group",
                input_type: "password",
                icon: Icons.lock_icon,
                autoComplete: "set password",
                placeholder: "Confirm password",
                parent_style: "w-100 mb-3",
                value: state?.confirm_password || "",
                is_mandatory: true,
                Err: errors?.confirm_password || "",
                onChange: (e) => setState("confirm_password", e.target.value),
                onkeydown: (e) => keyDownHandler(e)
            }
        ],

        // PROFESSIONAL SIGNUP PAGE UI JSON DATA
        professional_manual_signup_one: [
            {
                title: "Email Address",
                name: 'Email Address',
                autoComplete: 'username',
                category: 'input',
                type: 'input',
                input_type: 'email',
                parent_style: 'col-12 mb-3',
                placeholder: 'We’ll use this email to send you important updates',
                value: state?.email_id || '',
                labelClassName: "professional_text_auth_input_label",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.email_id || "",
                is_mandatory: true,
                disabled: state?.login_mode !== "Manual"
            },
            {
                title: 'Set Password',
                name: 'Set Password',
                autoComplete: 'new-password',
                category: 'input',
                type: 'input_group',
                input_type: 'password',
                labelClassName: "professional_text_auth_input_label",
                parent_style: `col-12 mb-3 ${state?.login_mode !== "Manual" ? 'd-none' : ''}`,
                placeholder: 'Enter your password here',
                value: state?.password || '',
                onChange: (e) => setState("password", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.password || "",
                is_mandatory: true
            },
            {
                title: 'Confirm Password',
                name: 'Confirm Password',
                autoComplete: 'new-password',
                category: 'input',
                type: 'input_group',
                input_type: 'password',
                labelClassName: "professional_text_auth_input_label",
                parent_style: `col-12 mb-3 ${state?.login_mode !== "Manual" ? 'd-none' : ''}`,
                placeholder: 'Enter your password here',
                value: state?.confirm_password || '',
                onChange: (e) => setState("confirm_password", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.confirm_password || "",
                is_mandatory: true
            },
            {
                name: <div className="professional_signup_checkbox">I agree to all the&nbsp;<a onClick={() => window.open(process.env.NEXT_PUBLIC_URL_COMPANY_TERMS_AND_CONDITIONS, "_blank")} className="text-decoration-none brand_color">Terms&nbsp;</a>and&nbsp;
                    <a onClick={() => window.open(process.env.NEXT_PUBLIC_URL_COMPANY_PRIVACY_POLICY, "_blank")} className="text-decoration-none brand_color">Privacy policy</a></div>,
                category: 'Checkbox',
                type: 'checkbox',
                labelClassName: "professional_text_auth_input_label",
                parent_style: 'col-12 mb-3',
                form_id: 'terms_and_conditions',
                checked: state?.terms_and_conditions || '',
                onChange: (e) => setState("terms_and_conditions", e.target.checked),
                Err: errors?.terms_and_conditions
            },
            {
                name: <div className="professional_signup_checkbox">I confirm that I am over 45 years of age</div>,
                category: 'Checkbox',
                type: 'checkbox',
                parent_style: 'col-12 mb-3',
                form_id: 'age_verification',
                labelClassName: "professional_text_auth_input_label",
                checked: state?.age_verification || '',
                onChange: (e) => setState("age_verification", e.target.checked),
                Err: errors?.age_verification
            }
        ],

        professional_manual_signup_two: [
            {
                title: 'First Name',
                name: 'First Name',
                autoComplete: 'given-name',
                category: 'input',
                type: 'text',
                parent_style: 'col-12 mb-3',
                placeholder: 'Enter your First Name',
                labelClassName: "professional_text_auth_input_label",
                icon: Icons.login_user_icon,
                value: state?.first_name || '',
                onChange: (e) => setState("first_name", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.first_name,
                is_mandatory: true
            },
            {
                title: 'Last Name',
                name: 'Last Name',
                autoComplete: 'family-name',
                category: 'input',
                type: 'text',
                parent_style: 'col-12 mb-3',
                placeholder: 'Enter your Last Name',
                labelClassName: "professional_text_auth_input_label",
                icon: Icons.login_user_icon,
                value: state?.last_name || '',
                onChange: (e) => setState("last_name", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.last_name,
                is_mandatory: true
            },
            {
                category: 'divider',
                style: '.1rem solid',
                parent_style: 'mb-2'
            },
            {
                title: 'City',
                category: "location",
                name: "City",
                autoComplete: "off",
                parent_style: "mb-3",
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: "This helps us connect you with local opportunities!",
                value: state?.location || "",
                onChange: (e) => setState("location", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                onBlur: (e) => {
                    const typedValue = e.target.value;
                    const [cityPart, countryPart] = typedValue.split(",").map(s => s.trim());

                    setState("city", cityPart || "")
                    setState("country", countryPart || "")
                    setState("location", typedValue)
                },
                place_selected: (place) => {
                    if (place) {
                        const selectedLocation = place.address_components || [];
                        const countryComponent = selectedLocation.find(c => c.types.includes("country"));

                        const cityName = selectedLocation[0]?.long_name || "";
                        const countryName = countryComponent?.long_name || "";

                        setState("city", cityName)
                        setState("country", countryName)
                        setState("location", [cityName, countryName].filter(Boolean).join(", "))
                    }
                },
                Err: errors?.location,
                is_mandatory: true
            },
            {
                title: 'Phone Number *',
                name: 'Phone Number',
                category: 'phone',
                autoComplete: 'tel',
                parent_style: 'mb-3',
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: "Make sure to check the right country code!",
                country_code: state?.country_code || '',
                value: state?.country_code
                    ? /\+/.test(state.country_code || '')
                        ? `${state.country_code}${state.contact_number || ''}`
                        : `+${state.country_code}${state.contact_number || ''}`
                    : state?.contact_number || '',
                onChange: (value, country) => {
                    let onlyNumber = value;
                    if (country?.dialCode && value.startsWith(country.dialCode)) {
                        onlyNumber = value.slice(country.dialCode.length);
                    }

                    onlyNumber = onlyNumber.replace(/^0+/, "").trim();

                    setState("contact_number", onlyNumber)
                    setState("country_code", country?.dialCode || "")
                    setState("country_iso", country?.countryCode?.toLowerCase() || "")
                    setState("phone_number_placed_country", country?.name || "")
                },
                Err: errors?.contact_number,
                is_mandatory: true
            },
            {
                title: 'Gender',
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Gender',
                parent_style: 'mb-3',
                placeholder: "Optional",
                options: auth_json.gender || [],
                child_style: "login_react_dropdown_select",
                color: "#1e75bb",
                className: 'py-2',
                value: state?.gender || [],
                labelClassName: "professional_text_auth_input_label",
                onChange: (e) => setState("gender", e),
                is_mandatory: false,
            }
        ],

        professional_manual_signup_three: [
            {
                title: 'Years of Experience',
                name: 'Years of Experience',
                autoComplete: 'off',
                category: 'input',
                type: 'text',
                parent_style: 'col-12 mb-3',
                labelClassName: "professional_text_auth_input_label",
                placeholder: 'Enter in Years ',
                value: state.years_of_experience || '',
                onChange: (e) => {
                    if (/^\d*$/.test(e.target.value) && e.target.value.length <= 3) {
                        setState("years_of_experience", e.target.value)
                    }
                },
                Err: errors.years_of_experience,
                is_mandatory: true
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Industry (multiple selections allowed)',
                parent_style: 'mb-3',
                labelClassName: "professional_text_auth_input_label",
                child_style: "login_react_dropdown_select",
                placeholder: "Select your industry",
                options: auth_json.industry_sector || [],
                value: state.industry_sector || [],
                multi: true,
                color: "#1e75bb",
                onChange: (e) => setState("industry_sector", e),
                Err: errors.industry_sector,
                is_mandatory: true
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Sector (multiple selections allowed)',
                parent_style: 'mb-3',
                labelClassName: "professional_text_auth_input_label",
                child_style: "login_react_dropdown_select",
                placeholder: "Select your sector type",
                options: sectors || [],
                value: state.sector || [],
                color: "#1e75bb",
                multi: true,
                onChange: (value) => {
                    let updatedOptions;

                    if (Array.isArray(value) && value.length) {
                        if (value[0]?.label === "Others") {
                            updatedOptions = sectors.map(v =>
                                v.label === "Others" ? v : { ...v, disabled: true }
                            );
                        } else {
                            updatedOptions = sectors.map(v =>
                                v.label !== "Others" ? v : { ...v, disabled: true }
                            );
                        }
                    } else {
                        updatedOptions = sectors.map(v => ({
                            ...v,
                            disabled: false,
                        }));
                    }

                    set_sectors(updatedOptions);
                    setState("sector", value)
                },
                Err: errors.sector,
                is_mandatory: true
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Functional Role (multiple selections allowed)',
                parent_style: 'mb-3',
                labelClassName: "professional_text_auth_input_label",
                child_style: "login_react_dropdown_select",
                placeholder: "What’s your key functional expertise?",
                options: auth_json.functional_specialization || [],
                multi: true,
                color: "#1e75bb",
                value: state.functional_specification || [],
                onChange: (e) => setState("functional_specification", e),
                Err: errors.functional_specification ? 'Functional Role required' : null,
                is_mandatory: true
            },
            {
                name: 'Upload Resume',
                category: 'input',
                autoComplete: 'off',
                type: 'file',
                parent_style: 'col-12 mb-3',
                labelClassName: "professional_text_auth_input_label",
                placeholder: 'Upload resume',
                value: state.file || [],
                accept: '.pdf',
                multiple: false,
                disabled: state.file?.length,
                resume_delete_spinner: state?.resume_delete_spinner,
                onChange: (e) => {
                    const newFiles = Array.from(e.target.files);
                    const pdfFiles = newFiles.filter(file => file.type === "application/pdf");
                    if (pdfFiles?.length) {
                        setState("file", newFiles)
                        e.target.value = "";
                    }
                },
                deleteImg: (delete_ind) => {
                    if (typeof state.file === 'string') {
                        let endpoint_state = { email_id: state?.email_id || '', file: state.file }
                        handle_delete_your_career_story_resume({ state: endpoint_state, setState, set_errors })
                    } else {
                        const new_data = state.file?.filter((__, ind) => ind !== delete_ind);
                        setState("file", new_data)
                    }
                },
                Err: errors.file,
                is_mandatory: true
            }
        ],

        professional_manual_signup_four: [
            {
                category: 'select',
                type: 'button_design_select',
                name: 'Job Type (Select all that apply)',
                parent_style: 'mb-3',
                options: auth_json?.register_job_type?.map((item) => item?.label) || [],
                value: state.job_type || [],
                onChange: (e) => {
                    let selected_job_type = Array.isArray(state.job_type) ? [...state.job_type] : [];

                    if (selected_job_type.includes(e)) selected_job_type = selected_job_type.filter((item) => item !== e);
                    else selected_job_type.push(e);

                    setState("job_type", selected_job_type)
                },
                childClassName: 'col-6 col-md-4 col-lg-3 h-100 p-1',
                childContentClassName: 'button_design_select',
                labelClassName: "professional_text_auth_input_label",
                is_mandatory: true,
                Err: errors.job_type,
            },
            {
                category: 'select',
                type: 'button_design_select',
                name: 'Work Location Preference (Select all that apply)',
                parent_style: 'mb-3',
                options: auth_json?.location_preference?.map((item) => item?.label) || [],
                value: state.location_preference || [],
                onChange: (e) => {
                    let selected_location = Array.isArray(state.location_preference) ? [...state.location_preference] : [];

                    if (selected_location.includes(e)) selected_location = selected_location.filter((item) => item !== e);
                    else selected_location.push(e);

                    setState("location_preference", selected_location)
                },
                childClassName: 'col-6 col-md-4 col-lg-3 h-100 p-1',
                childContentClassName: 'button_design_select',
                labelClassName: "professional_text_auth_input_label",
                is_mandatory: true,
                Err: errors.location_preference,
            },
            {
                category: 'select',
                type: 'button_design_select',
                name: 'Willing to Relocate?',
                parent_style: 'mb-3',
                options: auth_json?.willing_to_relocate?.map((item) => item?.label) || [],
                value: state.willing_to_relocate || [],
                onChange: (e) => setState("willing_to_relocate", e),
                childClassName: 'col-6 col-md-4 col-lg-3 h-100 p-1',
                childContentClassName: 'button_design_select',
                labelClassName: "professional_text_auth_input_label",
                is_mandatory: true,
                Err: errors.willing_to_relocate,
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Mode of Communication with 2nd Careers',
                parent_style: 'mb-3',
                options: modeOfCommOptions || [],
                value: state.mode_of_communication || [],
                multi: true,
                color: '#1e75bb',
                dropdownPosition: "auto",
                child_style: "login_react_dropdown_select",
                onChange: (value) => {
                    let updatedOptions;

                    if (Array.isArray(value) && value.length) {
                        if (value[0]?.label === "Others") {
                            updatedOptions = modeOfCommOptions.map(v => v.label === "Others" ? v : { ...v, disabled: true });
                        } else {
                            updatedOptions = modeOfCommOptions.map(v => v.label !== "Others" ? v : { ...v, disabled: true });
                        }
                    } else {
                        updatedOptions = modeOfCommOptions.map(v => ({ ...v, disabled: false }));
                    }

                    set_mode_of_communication(updatedOptions);
                    setState("mode_of_communication", value)
                    setState("mode_of_communication_others", "")
                },
                labelClassName: "professional_text_auth_input_label",
                is_mandatory: true,
                Err: errors.mode_of_communication,
            },
            {
                name: 'Others',
                category: 'textbox',
                parent_style: `col-12 ${state.mode_of_communication?.length ? state.mode_of_communication[0]?.label === "Others" ? 'd-block' : 'd-none' : 'd-none'}`,
                placeholder: '',
                value: state.mode_of_communication_others || '',
                labelClassName: "professional_text_auth_input_label",
                onChange: (e) => setState("mode_of_communication_others", e.target.value),
                Err: errors.mode_of_communication_others,
                is_mandatory: true
            }
        ],


        // EMPLOYER SIGNUP PAGE UI JSON DATA
        employer_manual_signup_one: [
            {
                title: "Email Address",
                name: 'Email Address',
                autoComplete: 'email',
                category: 'input',
                type: 'input',
                input_type: 'email',
                parent_style: 'col-12 mb-3',
                placeholder: 'We’ll use this email to send you important updates',
                value: state?.email_id || '',
                labelClassName: "professional_text_auth_input_label",
                onChange: (e) => setState("email_id", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.email_id || "",
                is_mandatory: true,
            },
            {
                title: "Organization Name",
                name: 'Organization Name',
                autoComplete: 'organization-name',
                category: 'input',
                type: 'input',
                input_type: 'text',
                parent_style: 'col-12 mb-3',
                placeholder: 'Enter your organization name here!',
                value: state?.organization_name || '',
                labelClassName: "professional_text_auth_input_label",
                onChange: (e) => setState("organization_name", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.organization_name || "",
                is_mandatory: true,
            },
            {
                title: 'Set Password',
                name: 'Set Password',
                autoComplete: 'new-password',
                category: 'input',
                type: 'input_group',
                input_type: 'password',
                labelClassName: "professional_text_auth_input_label",
                parent_style: `col-12 mb-3`,
                placeholder: 'Enter your password here',
                value: state?.password || '',
                onChange: (e) => setState("password", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.password || "",
                is_mandatory: true
            },
            {
                title: 'Confirm Password',
                name: 'Confirm Password',
                autoComplete: 'new-password',
                category: 'input',
                type: 'input_group',
                input_type: 'password',
                labelClassName: "professional_text_auth_input_label",
                parent_style: `col-12 mb-3`,
                placeholder: 'Enter your password here',
                value: state?.confirm_password || '',
                onChange: (e) => setState("confirm_password", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.confirm_password || "",
                is_mandatory: true
            },
            {
                name: <div className="professional_signup_checkbox">I agree to all the&nbsp;<a onClick={() => window.open(process.env.NEXT_PUBLIC_URL_COMPANY_TERMS_AND_CONDITIONS, "_blank")} className="text-decoration-none brand_color">Terms&nbsp;</a>and&nbsp;
                    <a onClick={() => window.open(process.env.NEXT_PUBLIC_URL_COMPANY_PRIVACY_POLICY, "_blank")} className="text-decoration-none brand_color">Privacy policy</a></div>,
                category: 'Checkbox',
                type: 'checkbox',
                labelClassName: "professional_text_auth_input_label",
                parent_style: 'col-12 mb-3',
                form_id: 'terms_and_conditions',
                checked: state?.terms_and_conditions || '',
                onChange: (e) => setState("terms_and_conditions", e.target.checked),
                Err: errors?.terms_and_conditions
            },
        ],

        employer_account_details: [
            {
                title: 'First Name',
                name: 'First Name',
                category: 'input',
                type: 'input',
                input_type: 'text',
                autoComplete: 'given-name',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                placeholder: 'Enter your first name',
                labelClassName: "professional_text_auth_input_label",
                value: state?.first_name || '',
                onChange: (e) => setState("first_name", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.first_name,
                is_mandatory: true
            },
            {
                title: 'Last Name',
                name: 'Last Name',
                category: 'input',
                type: 'input',
                input_type: 'text',
                autoComplete: 'family-name',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                placeholder: 'Enter your last name',
                labelClassName: "professional_text_auth_input_label",
                value: state?.last_name || '',
                onChange: (e) => setState("last_name", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.last_name,
                is_mandatory: true
            },
            {
                title: 'Designation',
                name: 'Designation',
                category: 'input',
                type: 'input',
                input_type: 'text',
                autoComplete: 'off',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                placeholder: 'Tell us more about your role!',
                labelClassName: "professional_text_auth_input_label",
                value: state?.designation || '',
                onChange: (e) => setState("designation", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.designation,
                is_mandatory: true
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Industry',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "login_react_dropdown_select",
                placeholder: "Select your industry",
                labelClassName: "professional_text_auth_input_label",
                options: auth_json.industry_sector,
                value: state?.industry || [],
                color: "#1e75bb",
                onChange: (e) => setState("industry", e),
                Err: errors?.industry,
                is_mandatory: true
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Organization Type',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "login_react_dropdown_select",
                placeholder: "Select your organization",
                labelClassName: "professional_text_auth_input_label",
                options: auth_json.organization_type,
                value: state?.organization_type || [],
                color: "#1e75bb",
                onChange: (e) => setState("organization_type", e),
                Err: errors?.organization_type,
                is_mandatory: true
            },
            {
                title: 'Website',
                name: 'Website',
                category: 'input',
                type: 'input',
                input_type: 'text',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: 'URL',
                value: state?.website || '',
                onChange: (e) => setState("website", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.website,
                is_mandatory: true
            },
            {
                title: 'City',
                category: "location",
                name: "City",
                autoComplete: "off",
                parent_style: "mb-3 col-12 col-md-6 px-3",
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: "This helps us connect you with local opportunities!",
                value: state?.location || "",
                onChange: (e) => setState("location", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                onBlur: (e) => {
                    const typedValue = e.target.value;
                    const [cityPart, countryPart] = typedValue.split(",").map(s => s.trim());

                    setState("city", cityPart || "")
                    setState("country", countryPart || "")
                    setState("location", typedValue)
                },
                place_selected: (place) => {
                    if (place) {
                        const selectedLocation = place.address_components || [];
                        const countryComponent = selectedLocation.find(c => c.types.includes("country"));

                        const cityName = selectedLocation[0]?.long_name || "";
                        const countryName = countryComponent?.long_name || "";

                        setState("city", cityName)
                        setState("country", countryName)
                        setState("location", [cityName, countryName].filter(Boolean).join(", "))
                    }
                },
                Err: errors?.location,
                is_mandatory: true
            },
            {
                title: 'Phone Number *',
                name: 'Phone Number',
                category: 'phone',
                autoComplete: 'tel',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: "Make sure to check the right country code!",
                country_code: state?.country_code || '',
                value: state?.country_code
                    ? /\+/.test(state.country_code || '')
                        ? `${state.country_code}${state.contact_number || ''}`
                        : `+${state.country_code}${state.contact_number || ''}`
                    : state?.contact_number || '',
                onChange: (value, country) => {
                    let onlyNumber = value;
                    if (country?.dialCode && value.startsWith(country.dialCode)) {
                        onlyNumber = value.slice(country.dialCode.length);
                    }

                    onlyNumber = onlyNumber.replace(/^0+/, "").trim();

                    setState("contact_number", onlyNumber)
                    setState("country_code", country?.dialCode || "")
                    setState("country_iso", country?.countryCode?.toLowerCase() || "")
                    setState("phone_number_placed_country", country?.name || "")
                },
                Err: errors?.contact_number,
                is_mandatory: true
            },
        ],

        partner_account_details: [
            {
                title: 'First Name',
                name: 'First Name',
                category: 'input',
                type: 'input',
                input_type: 'text',
                autoComplete: 'given-name',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                placeholder: 'Enter your first name',
                labelClassName: "professional_text_auth_input_label",
                value: state?.first_name || '',
                onChange: (e) => setState("first_name", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.first_name,
                is_mandatory: true
            },
            {
                title: 'Last Name',
                name: 'Last Name',
                category: 'input',
                type: 'input',
                input_type: 'text',
                autoComplete: 'family-name',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                placeholder: 'Enter your last name',
                labelClassName: "professional_text_auth_input_label",
                value: state?.last_name || '',
                onChange: (e) => setState("last_name", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.last_name,
                is_mandatory: true
            },
            {
                title: 'Designation',
                name: 'Designation',
                category: 'input',
                type: 'input',
                input_type: 'text',
                autoComplete: 'off',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                placeholder: 'Tell us more about your role!',
                labelClassName: "professional_text_auth_input_label",
                value: state?.designation || '',
                onChange: (e) => setState("designation", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.designation,
                is_mandatory: true
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Industry',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "login_react_dropdown_select",
                placeholder: "Select your industry",
                labelClassName: "professional_text_auth_input_label",
                options: auth_json.industry_sector,
                value: state?.industry || [],
                color: "#1e75bb",
                onChange: (e) => setState("industry", e),
                Err: errors?.industry,
                is_mandatory: true
            },
            {
                category: 'select',
                type: 'react_dropdown_select',
                name: 'Type of partner',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "login_react_dropdown_select",
                placeholder: "Select your organization",
                labelClassName: "professional_text_auth_input_label",
                options: auth_json.partner_type,
                value: state?.partner_type || [],
                color: "#1e75bb",
                onChange: (e) => setState("partner_type", e),
                Err: errors?.partner_type,
                is_mandatory: true
            },
            {
                title: 'Website',
                name: 'Website',
                category: 'input',
                type: 'input',
                input_type: 'text',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: 'URL',
                value: state?.website || '',
                onChange: (e) => setState("website", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                Err: errors?.website,
                is_mandatory: true
            },
            {
                title: 'City',
                category: "location",
                name: "City",
                autoComplete: "off",
                parent_style: "mb-3 col-12 col-md-6 px-3",
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: "This helps us connect you with local opportunities!",
                value: state?.location || "",
                onChange: (e) => setState("location", e.target.value),
                onkeydown: (e) => keyDownHandler(e),
                onBlur: (e) => {
                    const typedValue = e.target.value;
                    const [cityPart, countryPart] = typedValue.split(",").map(s => s.trim());

                    setState("city", cityPart || "")
                    setState("country", countryPart || "")
                    setState("location", typedValue)
                },
                place_selected: (place) => {
                    if (place) {
                        const selectedLocation = place.address_components || [];
                        const countryComponent = selectedLocation.find(c => c.types.includes("country"));

                        const cityName = selectedLocation[0]?.long_name || "";
                        const countryName = countryComponent?.long_name || "";

                        setState("city", cityName)
                        setState("country", countryName)
                        setState("location", [cityName, countryName].filter(Boolean).join(", "))
                    }
                },
                Err: errors?.location,
                is_mandatory: true
            },
            {
                title: 'Phone Number *',
                name: 'Phone Number',
                category: 'phone',
                autoComplete: 'tel',
                parent_style: 'mb-3 col-12 col-md-6 px-3',
                child_style: "professional_signup_location",
                labelClassName: "professional_text_auth_input_label",
                placeholder: "Make sure to check the right country code!",
                country_code: state?.country_code || '',
                value: state?.country_code
                    ? /\+/.test(state.country_code || '')
                        ? `${state.country_code}${state.contact_number || ''}`
                        : `+${state.country_code}${state.contact_number || ''}`
                    : state?.contact_number || '',
                onChange: (value, country) => {
                    let onlyNumber = value;
                    if (country?.dialCode && value.startsWith(country.dialCode)) {
                        onlyNumber = value.slice(country.dialCode.length);
                    }

                    onlyNumber = onlyNumber.replace(/^0+/, "").trim();

                    setState("contact_number", onlyNumber)
                    setState("country_code", country?.dialCode || "")
                    setState("country_iso", country?.countryCode?.toLowerCase() || "")
                    setState("phone_number_placed_country", country?.name || "")
                },
                Err: errors?.contact_number,
                is_mandatory: true
            },
        ],
    }

    return { jsx, json: auth_json }
}