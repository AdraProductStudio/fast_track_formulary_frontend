"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import ButtonSpinner from "~/components/Spinner/ButtonSpinner";
import SpinnerComponent from "~/components/Spinner/Spinner";
import Icons from "~/public/icons";
import { handle_apply_job, handle_remove_saved_job, handle_save_individual_job } from "~/services/professional";
import { useModalStore } from "~/store/ModalStore";
import { encryptData } from "~/utils/crypto";
import { useDeviceResizeListener } from "~/utils/functions/useViewportScale";

function JobCard({ job = {}, index = 0, page_from = "", state = {}, setState = () => { } }) {
    const router = useRouter();

    const show_sponsored_or_non_sponsored_badge = ["all_jobs", "recommended_jobs"].includes(page_from);
    const show_invited_by_employer_badge = page_from === "all_jobs" && job?.invited_by_employer === "1Y";
    const show_recommendation_badge = page_from === "recommended_jobs";
    const show_applied_badge = page_from === "applied_jobs";
    const show_remove_button = page_from === "saved_jobs";

    const applied_status = {
        "Not Reviewed": { className: 'job_reviewed', text: 'Not Reviewed' },
        "Shortlisted": { className: 'job_shortlisted', text: 'Shortlisted' },
        "Contacted": { className: 'job_contacted', text: 'Invited' },
        "Rejected": { className: 'job_rejected', text: 'Not selected by Employer' },
        "Hired": { className: 'job_shortlisted', text: 'Hired' }
    }

    const sponsored_meta_info = [
        { icon: Icons.job_location_icon, value: job?.workplace_type || '' },
        { icon: Icons.job_time_icon, value: job?.work_schedule || '' },
        { icon: Icons.job_type_icon, value: job?.job_type || '' },
        { icon: Icons.job_salary_icon, value: job?.is_paid === "Y" ? "Paid" : "Volunteer" || '' },
    ]

    function encrypt_job_data(id) {
        const encrypted_job_id = encryptData({ job_id: id });

        router.push(`/professional/jobs/${page_from}/${encrypted_job_id}`);
    }

    function handle_remove_job(e) {
        e.stopPropagation();

        handle_remove_saved_job({ params: { job_id: job?.id } || 0, state, setState });
        router.replace('/professional/jobs/saved_jobs');
    }

    return (
        <div className="card border-0 rounded-4 mb-2" key={index}>
            <div className="card-body job_card position-relative" onClick={() => encrypt_job_data(job?.id || 0)}>
                {show_invited_by_employer_badge && (
                    <div className="job_reviewed invited_by_employer_badge">
                        Invite to Apply by Employer
                    </div>
                )}

                {show_recommendation_badge && (
                    <div className={`${job?.recommended_by === "AI Recommendation" ? "job_reviewed" : "job_shortlisted"} recommendation_badge`}>
                        {job?.recommended_by}
                    </div>
                )}

                {show_applied_badge && (
                    ["closed"].includes((job?.job_status || "").toLowerCase()) ?
                        <div className="saved_badge d-flex">
                            <div className={`${applied_status[job?.application_status]?.className} saved_badge_padding me-2`}>
                                {applied_status[job?.application_status]?.text}
                            </div>

                            <div className="job_rejected saved_badge_padding">
                                This job has been closed
                            </div>
                        </div>
                        :
                        <div className={`${applied_status[job?.application_status]?.className} recommendation_badge`}>
                            {applied_status[job?.application_status]?.text}
                        </div>
                )}

                {show_remove_button && (
                    ["closed", "paused"].includes((job?.job_status || "").toLowerCase()) ?
                        <div className="saved_badge d-flex">
                            {show_invited_by_employer_badge && (
                                <div className="job_reviewed saved_badge_padding me-2">
                                    Invite to Apply by Employer
                                </div>
                            )}

                            <div className="job_rejected saved_badge_padding">
                                {job?.job_status?.toLowerCase() === "paused" ?
                                    "This job is no longer receiving applicants"
                                    :
                                    "This job has been closed"
                                }
                            </div>
                        </div>
                        :
                        show_invited_by_employer_badge && (
                            <div className="job_reviewed invited_by_employer_badge">
                                Invite to Apply by Employer
                            </div>
                        )
                )}

                <div className="job_card_header">
                    {show_remove_button && (
                        <div className="w-100 my-1 text-end">
                            <ButtonComponent className="btn-outline-secondary" onClick={handle_remove_job}>
                                {state?.is_job_remove_queue_loading?.includes(job?.id) ?
                                    <SpinnerComponent className="mx-3" />
                                    :
                                    <>
                                        <span className="me-1">{Icons.job_remove_icon}</span>
                                        Remove
                                    </>
                                }
                            </ButtonComponent>
                        </div>
                    )}

                    <div className="job_card_header_image">
                        <Image src={process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN + (job?.profile_image || 'employer/logo/default_profile_picture_employer.png')} alt="company_logo" width={60} height={60} className="rounded-3" />
                    </div>
                    <div className="job_card_header_details">
                        <h6>{job?.job_title || ''}</h6>

                        {show_sponsored_or_non_sponsored_badge && (job?.pricing_category ?
                            <div className="sponsored_job_badge">
                                {Icons.sponsored_job_star}
                                <span className="ps-1 d-inline-block">2nd Careers Sponsored job</span>
                            </div>
                            :
                            <div className="non_sponsored_job_badge">
                                Non Sponsored job
                            </div>
                        )}

                        <div className="hstack gap-3 my-3 align-items-center">
                            <div className="col-auto">
                                {Icons.job_card_building}
                                <span className="ps-2">{job?.company_name || ''}</span>
                            </div>
                            <div className="vr"></div>
                            <div className="col">
                                Posted on : <span>{new Date(job?.created_at || '').toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap job_card_meta_info">
                            {sponsored_meta_info?.map((meta, idx) => (
                                <div className="col-6 mb-1" key={idx}>
                                    {meta?.icon}
                                    <span>{meta?.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="job_card_description mt-3">
                    {job?.job_overview || ''}
                </div>
            </div>
        </div>
    )
}

function JobNotFoundCard({ card_inner_height = "", content = "" }) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: card_inner_height || "100%" }}>
            {/http|https/.test(content) ?
                <Image src={content} alt="no_data_image" width={300} height={300} />
                :
                content || "No Data Found"
            }
        </div>
    );
}

function JobDetailsCard({ job_details, page_from = "" }) {
    const router = useRouter();
    const pathname = usePathname();

    const { width } = useDeviceResizeListener();
    const show_detailed_job_only_for_small_devices = !pathname.endsWith(`/${page_from}`) && width < 1200;

    const [job, set_job] = useState(job_details || {});

    useEffect(() => {
        set_job(job_details || {});
    }, [job_details]);

    const { openModal, closeModal, update_modal_data } = useModalStore();
    const job_status_buttons = {
        opened: { title: "Apply Now", className: "btn_brand_color" },
        paused: { title: "Job Paused", className: "btn_job_closed_paused pe-none" },
        closed: { title: "Job Closed", className: "btn_job_closed_paused pe-none", },
        applied: { title: "Applied", className: "btn_brand_color pe-none" },
    }

    const is_sponsored = Boolean(job.pricing_category);
    const is_job_saved = job.saved_status === "saved";
    const job_apply_btn_name = job_status_buttons[(job.job_status || "opened")?.toLowerCase()];
    const is_apply_job_has_requirements = Boolean(job?.required_resume === "Y" || job?.required_cover_letter === "Y" || job?.questions?.length);
    const is_eligible_to_apply_job = job?.profile_percentage >= 60;
    const show_save_button_in = ["all_jobs", "recommended_jobs"].includes(page_from);

    const sponsored_job_additional_info = [
        { icon: Icons.job_location_icon, value: (job?.workplace_type || '') + ' - ' + (job?.city || job?.job_city || '') },
        { icon: Icons.job_time_commitments, value: job?.time_commitment || '' },
        { icon: Icons.job_timezone, value: job?.timezone || '' },
        { icon: Icons.job_type_icon, value: job?.job_type || '' },
        { icon: Icons.job_specialisation, value: job?.specialisation || '' },
        { icon: Icons.job_time_icon, value: job?.work_schedule || '' },
        { icon: Icons.job_salary_icon, value: job?.is_paid === "Y" ? "Paid" : "Volunteer" || '' },
        { icon: Icons.job_duration, value: job?.duration || '' },
    ]

    const non_sponsored_job_additional_info = [
        { icon: Icons.job_location_icon, value: (job?.workplace_type || '') + ' - ' + (job?.city || job?.job_city || '') },
        { icon: Icons.job_location_non_sponsored, value: (job?.state || job?.job_state || '') + ' - ' + (job?.country || '') },
        { icon: Icons.job_type_icon, value: job?.job_type || '' },
        { icon: Icons.job_time_icon, value: job?.work_schedule || '' },
    ]

    function apply_job_btn_fun() {
        if (!is_sponsored) {
            window.open(job.apply_link, "_blank", "noopener,noreferrer");
            return;
        }

        let apply_job_modal_data = {
            questions: (job?.questions || []).map((q) => ({ ...q, answer: '' })),
            job_id: job?.id || 0,
            user_resume: job?.user_resume || '',
            required_cover_letter: job?.required_cover_letter || '',
            required_resume: job?.required_resume || '',
            use_existing_resume: !job?.user_resume ? false : true,
        }

        let draft_ai_params = {
            company_name: job?.company_name || '',
            job_title: job?.job_title || '',
            country: job?.country || '',
            city: job?.city || job?.job_city || '',
            job_desc: job?.job_desc || '',
        }

        if (!is_eligible_to_apply_job)
            return openModal({ modal_name: "job_profile_incomplete_modal", size: "md", close_button: true, data: {} });
        else
            // Has requirements to apply
            if (is_apply_job_has_requirements)
                return openModal({ modal_name: "apply_job_modal", size: "lg", close_button: true, data: { ...apply_job_modal_data, draft_ai_params }, modal_function: { setStateFun, apply_job_main_fun } });

        // No Requirements, Directly applying to job
        apply_job_main_fun({ data: apply_job_modal_data });
    }

    function setStateFun(newState) {
        update_modal_data({ ...newState });
    }

    async function apply_job_main_fun({ data }) {
        handle_apply_job({ data, setState: setStateFun, update_job_state: set_job, closeModal })
    }

    async function save_job_main_fun() {
        handle_save_individual_job({ params: { job_id: job?.id } || 0, setState: set_job });
    }

    return (
        <div className="h-100">
            {show_detailed_job_only_for_small_devices &&
                <ButtonComponent className="btn-outline-secondary mb-3" onClick={() => router.push(`/professional/jobs/${page_from}`)}>
                    Back to All Jobs
                </ButtonComponent>
            }
            <div className="card job_details_section_one border-0 rounded-4">
                <div className="card-body job_details">
                    <div className="job_details_header_image">
                        <Image src={process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN + (job?.profile_image || is_sponsored ? 'employer/logo/default_profile_picture_employer.png' : 'employer/logo/default_profile_picture.png')} alt="company_logo" width={80} height={80} className="rounded-3" />
                    </div>
                    <div className="job_details_header_content">
                        <h5>{job?.job_title || ''}</h5>
                        <h6>{job?.company_name || ''}</h6>
                        <div className="col job_details_posted_on">
                            Posted on : <span>{new Date(job?.created_at || '').toLocaleString()}</span>
                        </div>

                        <div className="col d-flex flex-wrap clearfix mt-3">
                            <div className="col-4">
                                <ButtonSpinner className={`py-2 px-3 ${job_apply_btn_name.className}`} is_spinner={job?.apply_loading} title={job?.apply_loading ? "Applying..." : job_apply_btn_name.title} onClick={apply_job_btn_fun} />
                            </div>

                            <div className="col text-end">
                                {is_sponsored && show_save_button_in ?
                                    <ButtonSpinner className={`${is_job_saved ? "btn-secondary pe-none" : "btn-outline-secondary"} py-2 px-3`} is_spinner={job?.save_loading} onClick={save_job_main_fun}>
                                        <span>
                                            {job?.save_loading ?
                                                "Saving..."
                                                :
                                                <span>
                                                    <span className="me-2">{is_job_saved ? Icons.job_saved_icon : Icons.job_save_icon}</span>
                                                    {is_job_saved ? "Saved" : "Save"}
                                                </span>
                                            }
                                        </span>
                                    </ButtonSpinner>
                                    :
                                    null
                                }

                                <ButtonComponent className="btn-outline-secondary py-2 px-3 ms-2" onClick={() => openModal({ modal_name: 'job_share_modal', size: 'lg', close_button: true, data: { job_share_id: job?.id } })}>
                                    <span className="me-2">{Icons.job_share_icon}</span>
                                    Share
                                </ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card job_details_section_two mt-2 border-0 rounded-4">
                <div className="card-body px-4 pt-0">
                    {job.recommended_by &&
                        <div className="my-4">
                            <h5 className="title">Recommended By</h5>
                            <div className="alert content w-100 word_break job_description_alert">{job?.recommended_by || ''}</div>
                        </div>
                    }

                    {job.feedback &&
                        <div className="my-4">
                            <h5 className="title">Employer feedback</h5>
                            <div className="alert content w-100 word_break job_description_alert">{job?.feedback || ''}</div>
                        </div>
                    }

                    {job.invited_message &&
                        <div className="my-4">
                            <h5 className="title">Message from Employer: Invite to Apply</h5>
                            <div className="alert content w-100 word_break job_description_alert">{job?.invited_message || ''}</div>
                        </div>
                    }

                    <div className="job_description">
                        <h5 className="title">{is_sponsored ? "About Company" : "Company Sector"}</h5>
                        <div className="content w-100 word_break">{is_sponsored ? job?.company_description || '' : job?.sector || ''}</div>

                        {is_sponsored &&
                            <div className="d-flex flex-wrap mt-3">
                                <div className="col-6 mt-3 text-center word_break text-secondary">
                                    {Icons.job_description_employer_type}
                                    <span>{job?.employer_type || ''}</span>
                                </div>

                                <div className="col-6 mt-3 text-center word_break text-secondary">
                                    {Icons.job_description_sector}
                                    <span>{job?.sector || ''}</span>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="job_description">
                        <h5 className="title">Job Description</h5>
                        <div className="content w-100 word_break" dangerouslySetInnerHTML={{ __html: job?.job_desc || '' }} />
                    </div>

                    <div className="job_description">
                        <h5 className="title">Additional Information</h5>
                        <div className="d-flex flex-wrap">
                            {(is_sponsored ? sponsored_job_additional_info : non_sponsored_job_additional_info)?.map((meta, idx) => (
                                <div className="col-6 mt-3 job_additional_info_content word_break ps-2 ps-md-5" key={idx}>
                                    {meta?.icon}
                                    <span>{meta?.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {job?.skills?.split(",")?.length &&
                        <div className="job_description">
                            <h5 className="title">Skills / Competencies</h5>
                            <div className="content w-100 word_break">
                                {job?.skills?.split(",")?.map((v, i) => {
                                    return v !== '' ? <li key={i} className="ms-5">{v}</li> : null;
                                })}
                            </div>
                        </div>
                    }

                    {!is_sponsored &&
                        <>
                            {job?.workplace_type &&
                                <div className="mb-4 job_description">
                                    <h6 className="title">Work Type:</h6>
                                    <li className="content ms-5">{job?.workplace_type}</li>
                                </div>}

                            {job?.seniority && job?.seniority !== "nan" &&
                                <div className="mb-4 job_description">
                                    <h6 className="title">Seniority:</h6>
                                    <li className="content ms-5">{job?.seniority}</li>
                                </div>}

                            {job?.functional_specification &&
                                <div className="mb-4 job_description">
                                    <h6 className="title">Functional Specification:</h6>
                                    {job?.functional_specification?.split(",")?.map((val, ind) => (
                                        <li className="content ms-5" key={ind}>{val}</li>
                                    ))}
                                </div>}

                            {job?.functional_specification_others && job?.functional_specification_others !== "nan" &&
                                <div className="mb-4 job_description">
                                    <h6 className="title">Functional Specification:</h6>
                                    <li className="content ms-5">{job?.functional_specification_others}</li>
                                </div>}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export { JobCard, JobNotFoundCard, JobDetailsCard } 