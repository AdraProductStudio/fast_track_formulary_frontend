"use client";

import { useState } from "react";
import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import Icons from "~/public/icons";
import { Images } from "~/public/image";

export default function ProfessionalLiveEventsCard({ index, data }) {
    const [expanded, setExpanded] = useState(false);
    const program_level = { Basic: '33.33', Intermediate: '66.66', Advanced: '100' }

    return (
        <div className="col-12 col-md-10 col-lg-6 col-xl-10 col-xxl-8 p-2" key={index}>
            <div className="training_event_card h-100">
                <div className="training_main_content col-12 col-xl-7">
                    <h3>{data?.title || ""}</h3>
                    <p>{data?.title_description || ""}</p>

                    <div className="d-flex flex-wrap align-items-end">
                        <div className="col-12 col-xl-8">
                            <div className="card border-0 rounded-3 mt-xl-2 position-static">
                                <div className="card-body p-0">
                                    <div className="d-flex border-bottom p-2 flex-wrap align-items-center py-3" >
                                        <div className="col-5">
                                            <h6 className="mb-0 d-flex align-items-center">
                                                {Icons.Date}
                                                <span className='ps-2'>Date</span></h6>
                                        </div>
                                        <div className="col-7">
                                            <p className="mb-0">{data?.formattedDate || ""}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex border-bottom p-2 flex-wrap align-items-center py-3" >
                                        <div className="col-5">
                                            <h6 className="mb-0 d-flex align-items-center">
                                                {Icons.Time}
                                                <span className='ps-2'>Time</span></h6>
                                        </div>
                                        <div className="col-7">
                                            <p className="mb-0">{data?.formattedTime || ""}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex p-2 flex-wrap align-items-center py-3" >
                                        <div className="col-5">
                                            <h6 className="mb-0 d-flex align-items-center">
                                                {Icons.Location}
                                                <span className='ps-2'>Location</span></h6>
                                        </div>
                                        <div className="col-7">
                                            <p className="mb-0">{data?.type_of_offering || ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-xl-4 p-lg-3 pb-lg-1 d-flex flex-xl-column flex-wrap">
                            {data?.certificate_program === "Yes" &&
                                <div className="certificate_division mt-4 mt-lg-0">
                                    <p className="mb-0" style={{ fontSize: '.9rem' }}>Certificate Program</p>
                                    <Image src={Images.image} alt="certificate" />
                                </div>
                            }

                            <div className="progeress_division col-12 col-xl-12 mt-2">
                                <div className="col-xl-12">
                                    <p className="mb-1" style={{ fontSize: '.9rem' }}>{data?.program_level}</p>
                                    <div className="progress three-division" data-progress={program_level[data?.program_level]}>
                                        <div className="progress-bar" style={{ width: `${program_level[data?.program_level]}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 d-flex align-items-center">
                        <ButtonComponent className="btn_brand_color px-4 py-2 rounded-3">
                            Register Now
                        </ButtonComponent>
                        <div className="ms-4">
                            <ButtonComponent className="btn-light training_expand_button d-grid align-items-center justify-content-center" onClick={() => setExpanded(!expanded)} >
                                <span
                                    style={{
                                        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease",
                                        display: "inline-block",
                                    }}
                                >
                                    {Icons.down_arrow_icon}
                                </span>
                            </ButtonComponent>
                        </div>
                    </div>
                </div>

                <div className="training_image col-12 col-xl-5">
                    <Image src={`${process.env.NEXT_PUBLIC_URL_SECOND_CAREERS_CDN}${data?.image || ''}`} alt="training event" width={1080} height={1080} />
                </div>

                <div
                    className="col-12 overflow-hidden"
                    style={{
                        maxHeight: expanded ? "100%" : "0px",
                        opacity: expanded ? 1 : 0,
                        backgroundColor: "#f8f9fa",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        transition: "all 0.1s",
                        padding: expanded ? "20px" : "0 20px",
                        order: 3
                    }}
                >
                    <div className="d-flex flex-wrap border-bottom py-3">
                        <div className="col-4">
                            <h5 className="training_accordion_title">About Program</h5>
                        </div>
                        <div className="col ps-3 border-start text-break">
                            <p>{data?.about_program}</p>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap border-bottom py-3">
                        <div className="col-4">
                            <h5 className="training_accordion_title">Ideal for</h5>
                        </div>
                        <div className="col ps-3 border-start text-break">
                            <p>{data?.what_to_expect}</p>
                        </div>
                    </div>

                    <div className={`${data?.certificate_program === "Yes" ? "border-bottom" : ""} d-flex flex-wrap py-3`}>
                        <div className="col-4">
                            <h5 className="training_accordion_title">Speaker</h5>
                        </div>
                        <div className="col ps-3 border-start text-break">
                            <h5>{data?.speaker_name}</h5>
                            <p>{data?.about_speaker}</p>
                        </div>
                    </div>

                    {data?.certificate_program === "Yes" &&
                        <div className="d-flex flex-wrap py-3">
                            <div className="col-4">
                                <h5 className="training_accordion_title">Certificate Program</h5>
                            </div>
                            <div className="col ps-3 border-start text-break">
                                <h5>{data?.certification_name || ""}</h5>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}