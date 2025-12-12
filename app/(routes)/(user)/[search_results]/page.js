"use client"

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import AlternativeMedicationCardSkeleton from "~/components/Skleton/alternative_medication_card";
import Icons from "~/public/icons";
import { vector_icons } from "~/public/svg";
import { handle_Search_drugs_func } from "~/services/endpoint/durgs";
import { decryptData } from "~/utils/crypto";

export default function searchDetails({ params }) {
    const router = useRouter();
    const pathname = usePathname();

    const { search_results } = React.use(params)
    const decrypted_data = decryptData(search_results);
    const [data, setData] = React.useState({})

    useEffect(() => {
        console.log("decrypted_data", decrypted_data)
        setData(decrypted_data)

        if (!search_results || !decrypted_data)
            router.push('/')

        if (decrypted_data?.search_text)
            handle_Search_drugs_func({ state: decrypted_data, setState: setData, router })
    }, [])

    if (!data?.search_text) return null

    return (
        <div className="h-100 med_search_result">
            <div className="card med_search_result_card custom_card_shadow">
                <div className="card-header border-0 bg-transparent pt-3 border-bottom">
                    <ButtonComponent className="btn-transparent ps-0" onClick={() => router.back()}>
                        <span className="pe-2">{Icons.left_arrow_white}</span>
                        Back to search
                    </ButtonComponent>

                    <div className="ps-2 pt-2">
                        <h5 className="mb-3 text-primary">Search Results</h5>
                    </div>
                </div>

                <div className="card-body med_details_page_content">
                    {data?.spinner ?
                        <div className="d-flex flex-wrap mt-3">
                            <AlternativeMedicationCardSkeleton />
                        </div>
                        :
                        data?.data?.length ?
                            <div className="d-flex flex-wrap mt-3">
                                {data?.data?.map((medication, index) => (
                                    <div className="col-12 col-md-6 col-lg-4 col-xxl-3 p-2" key={index} onClick={() => router.push(pathname + "/search_details")}>
                                        <div className="card custom_card_shadow h-100 med_suggestion_list_card">
                                            <div className="card-header border-0 bg-transparent pt-3">
                                                <p className="mb-2"> {medication?.drugName || ""}</p>

                                                <div className="border-bottom">
                                                    <p className="para_three mb-2">ID: {medication?.drugID || ""}</p>
                                                </div>
                                            </div>

                                            <div className="card-body py-1 d-grid align-content-center">
                                                <div className="d-flex flex-wrap">
                                                    <div className="col-12 medical_condition_name mb-2">
                                                        <Image src={vector_icons.guard_icon} width={18} height={18} alt="time_icon" className="me-2 mb-1" />
                                                        <p className="para_three mb-0">{medication?.medicalConditionName || ""}</p>
                                                    </div>

                                                    <div className="col-8 border-end pe-3">
                                                        <h6 className="text-primary">
                                                            <Image src={vector_icons.time_icon} width={18} height={18} alt="time_icon" className="me-2 mb-1" />
                                                            Limit
                                                        </h6>
                                                        <p className="para_three mb-2">{medication?.indications || "60 tablets per 30 days"}</p>
                                                    </div>
                                                    <div className="col ps-3 req_content">
                                                        <h6>
                                                            <Image src={vector_icons.tag_icon} width={18} height={18} alt="time_icon" className="me-2 mb-1" />
                                                            Req
                                                        </h6>
                                                        <p className="para_three mb-2 ps-4">{medication?.requirements || ""}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {medication?.isAlternative && (
                                                <div className="card-footer border-0 bg-transparent border-top py-2">
                                                    <div className="custom_card_success">
                                                        Alternative Medication
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="col-12 h-75 d-flex flex-wrap justify-content-center align-items-center">
                                <p className="text-center mt-5">No results found</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}