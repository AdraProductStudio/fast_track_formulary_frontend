"use client"

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import { AlternativeMedicationCardSkeleton, AlternativeMedicationTableSkeleton } from "~/components/Skleton/alternative_medication_card";
import Icons from "~/public/icons";
import { vector_icons } from "~/public/svg";
import { handle_Search_drugs_func } from "~/services/endpoint/durgs";
import { decryptData, encryptData } from "~/utils/crypto";

export default function searchDetails({ params }) {
    const router = useRouter();

    const { search_results } = React.use(params)
    const decrypted_data = decryptData(search_results);
    const [data, setData] = React.useState({ spinner: true })

    function selected_primary_medication_data(drug_id) {
        let selected_primary_drug_data = { ...data }
        selected_primary_drug_data = selected_primary_drug_data?.data?.primary?.results?.find(item => item?.drugId === drug_id) || {}

        return selected_primary_drug_data;
    }

    function selected_primary_medication(selected_medication) {
        let selected_primary_drug_data = selected_primary_medication_data(selected_medication)
        let update_decrypted_data = { ...decrypted_data }
        update_decrypted_data.selected_primary_drug = selected_medication;
        update_decrypted_data = encryptData(update_decrypted_data);

        setData(prev => ({ ...prev, selected_primary_drug: selected_medication, selected_primary_drug_data: selected_primary_drug_data, show_alternatives: false }))
        window.history.replaceState(null, null, update_decrypted_data);
    }

    useEffect(() => {
        setData(decrypted_data)

        if (!search_results || !decrypted_data)
            router.push('/')

        if (decrypted_data?.search_text)
            handle_Search_drugs_func({ state: decrypted_data, setState: setData, router })
    }, [])

    if (!data?.search_text) return null

    return (
        data?.selected_primary_drug ?
            <div className="h-100 med_search_result">
                <div className="card med_search_result_card custom_card_shadow">
                    <div className="card-header border-0 bg-transparent pt-3">
                        <ButtonComponent className="btn-transparent ps-0 d-flex align-items-center" onClick={() => selected_primary_medication(null)}>
                            <span className="pe-2">{Icons.left_arrow_white}</span>
                            Back to search
                        </ButtonComponent>

                        <div className="ps-2 pt-2 bg-white w-100">
                            <h5 className="mb-3">
                                {data?.selected_primary_drug_data?.drugName || ""}
                            </h5>
                            <p className="para_three mb-lg-0">{data?.selected_primary_drug_data?.formularyName || ""}</p>
                        </div>
                    </div>

                    <div className="card-body w-100 px-md-4">
                        <div className="med_details_page_content d-flex flex-wrap">
                            <div className="col">
                                <div className="card h-100 custom_card_shadow">
                                    <div className="card-body w-100 px-2 px-md-4">
                                        <h6 className="my-3 text-center">Current medications</h6>

                                        <div className="card border rounded-4 overflow-hidden">
                                            <div className="card-header border-0 current_medication_left_side_header">
                                                Summary of coverage requirements
                                            </div>
                                            {data?.spinner ?
                                                <AlternativeMedicationTableSkeleton />
                                                :
                                                <div className="card-body">
                                                    <table className="table current_medication_left_side_table">
                                                        <tbody>
                                                            <tr>
                                                                <td>Branded</td>
                                                                <td className="text-end">{data?.selected_primary_drug_data?.isBranded ? "Yes" : "No"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tier</td>
                                                                <td className="text-end">
                                                                    <span className="heading_tire_primary_badge">Tier {data?.selected_primary_drug_data?.tierLevel || "N/A"}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Drug tier</td>
                                                                <td className="text-end ">{data?.selected_primary_drug_data?.drugTier || "N/A"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Medical condition name - 1</td>
                                                                <td className="text-end">{data?.selected_primary_drug_data?.medicalConditionName1 || "N/A"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Medical condition name - 2</td>
                                                                <td className="text-end">{data?.selected_primary_drug_data?.medicalConditionName2 || "N/A"}</td>
                                                            </tr>
                                                            <tr className="">
                                                                <td>Limit</td>
                                                                <td className="text-end">{data?.selected_primary_drug_data?.quantityLimitText || "N/A"}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td>Req</td>
                                                                <td className="text-end">{data?.selected_primary_drug_data?.requirementsText || "N/A"}</td>
                                                            </tr> */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="alternate_medications_width">
                                <div className="card h-100 custom_card_shadow">
                                    <div className="card-body w-100 px-2 px-md-4">
                                        <div className="custom_card_shadow rounded-3">
                                            <div className="p-3 d-flex flex-wrap align-items-center">
                                                <div className="col">
                                                    <h6 className="text-primary mb-0">Show Alternatives</h6>
                                                </div>
                                                <div className="col">
                                                    <ButtonComponent className="btn-transparent float-end suggestion_plus_icon" onClick={() => setData(prev => ({ ...prev, "show_alternatives": !prev?.show_alternatives }))}>
                                                        {data?.show_alternatives ? Icons.minus_icon : Icons.plus_icon}
                                                    </ButtonComponent>
                                                </div>
                                            </div>
                                        </div>
                                        {data?.spinner ?
                                            <div className="d-flex flex-wrap mt-3">
                                                <AlternativeMedicationCardSkeleton className="col-12 col-md-6 p-2" />
                                            </div>
                                            :
                                            data?.show_alternatives ?
                                                data?.data?.alternative?.alternativeDrugCount ?
                                                    <div className="d-flex flex-wrap mt-3">
                                                        {data?.data?.alternative?.results?.map((medication, index) => (
                                                            <div className="col-12 col-xxl-6 py-2 p-xxl-2" key={index}>
                                                                <div className="card custom_card_shadow h-100">
                                                                    <div className="card-body">
                                                                        <p className="mb-2"> {medication?.drugName || ""}</p>
                                                                        {medication?.tierLevel || medication?.drugTier ? (
                                                                            <div className="my-3 d-flex flex-wrap gap-2">
                                                                                {medication?.tierLevel && <span className="heading_tire_primary_badge">Tier {medication?.tierLevel || ""}</span>}
                                                                                {medication?.drugTier && <span className="heading_tire_primary_badge">{medication?.drugTier || ""}</span>}
                                                                            </div>
                                                                        )
                                                                            :
                                                                            null}

                                                                        <div className="border-bottom mt-2">
                                                                            <p className="para_three mb-2">{medication?.formularyName || ""}</p>
                                                                        </div>

                                                                        <div className="border-bottom mt-3">
                                                                            <h6 className="text-secondary">Availability</h6>
                                                                            <p className="para_two mb-2 ps-3" style={{ color: medication?.isActive ? "#008236" : "red" }}> {medication?.isActive ? "Available" : "Not Available"}</p>
                                                                        </div>

                                                                        <div className="border-bottom mt-3">
                                                                            <h6 className="text-secondary">Branded</h6>
                                                                            <p className="para_three mb-2 ps-3" style={{ color: medication?.isBranded ? "#008236" : "red" }}>{medication?.isBranded ? "Yes" : "No"}</p>
                                                                        </div>

                                                                        <div className="border-bottom mt-3">
                                                                            <h6 className="text-secondary">Medical Condition name</h6>
                                                                            <p className="para_three mb-2 text-primary ps-4">- {medication?.medicalConditionName1 || "N/A"}</p>
                                                                            <p className="para_three mb-2 text-primary ps-4">- {medication?.medicalConditionName2 || "N/A"}</p>
                                                                        </div>

                                                                        <div className="mt-3 d-flex flex-wrap">
                                                                            <div className="col taper_border_right pe-3">
                                                                                <h6 className="text-primary">Limit</h6>
                                                                                <p className="para_three mb-2">{medication?.quantityLimitText || "N/A"}</p>
                                                                            </div>
                                                                            <div className="col ps-3">
                                                                                <h6 className="text-primary">Req</h6>
                                                                                <p className="para_three mb-2">{medication?.requirementsText || "N/A"}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    :
                                                    <div className="col-12 h-75 d-flex flex-wrap justify-content-center align-items-center">
                                                        <p className="text-center mt-5">No results found</p>
                                                    </div>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="h-100 med_search_result">
                <div className="card med_search_result_card custom_card_shadow">
                    <div className="card-header border-0 bg-transparent pt-3">
                        <ButtonComponent className="btn-transparent ps-0" onClick={() => router.back()}>
                            <span className="pe-2">{Icons.left_arrow_white}</span>
                            Back to search
                        </ButtonComponent>
                    </div>

                    <div className="card-body w-100">
                        <div className="med_details_page_content">
                            {data?.spinner ?
                                <div className="d-flex flex-wrap mt-3">
                                    <AlternativeMedicationCardSkeleton className="col-12 col-md-6 col-lg-4 col-xxl-3 p-2" />
                                </div>
                                :
                                data?.data?.primary?.drugCount ?
                                    <div className="d-flex flex-wrap mt-3">
                                        {data?.data?.primary?.results?.map((medication, index) => (
                                            <div className="col-12 col-md-6 col-xxl-3 py-2 p-md-2" key={index} onClick={() => selected_primary_medication(medication?.drugId || "")}>
                                                <div className="card custom_card_shadow h-100 med_suggestion_list_card">
                                                    {medication?.tierLevel && (<div className="med_suggestion_list_card_tier">  Tier {medication?.tierLevel || "N/A"} </div>)}

                                                    <div className={`card-header border-0 bg-transparent pt-3 ${medication?.tierLevel ? "mt-4" : ""}`}>
                                                        <p className="mb-2"> {medication?.drugName || ""}</p>
                                                        <p className="para_three mb-2">{medication?.formularyName || ""}</p>
                                                        <div className="border-bottom">
                                                            <p className="para_three">Drug ID: {medication?.drugId || ""}</p>
                                                        </div>

                                                    </div>

                                                    <div className="card-body py-1 d-grid align-content-center">
                                                        <div className="d-flex flex-wrap">
                                                            <div className="mb-2">
                                                                <p className="para_two mb-1" style={{ color: medication?.isActive ? "#008236" : "red" }}> {medication?.isActive ? "Available" : "Not Available"}</p>
                                                            </div>

                                                            <div className="col-12 medical_condition_name mb-3">
                                                                <Image src={vector_icons.guard_icon} width={18} height={18} alt="time_icon" className="me-2 mb-1" />
                                                                <div>
                                                                    <p className="para_three mb-0">- {medication?.medicalConditionName1 || ""}</p>
                                                                    <p className="para_three mb-0">- {medication?.medicalConditionName2 || ""}</p>
                                                                </div>
                                                            </div>

                                                            <div className="col-6 border-end pe-3">
                                                                <h6 className="text-primary">
                                                                    <Image src={vector_icons.time_icon} width={18} height={18} alt="time_icon" className="me-2 mb-1" />
                                                                    Limit
                                                                </h6>
                                                                <p className="para_three mb-2">{medication?.quantityLimitText || "N/A"}</p>
                                                            </div>

                                                            <div className="col ps-3 req_content">
                                                                <h6>
                                                                    <Image src={vector_icons.tag_icon} width={18} height={18} alt="time_icon" className="me-2 mb-1" />
                                                                    Req
                                                                </h6>
                                                                <p className="para_three mb-2 word_break_all">{medication?.requirementsText || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {medication?.drugTier && (
                                                        <div className="card-footer border-0 bg-transparent border-top py-3">
                                                            <div className="custom_card_success">
                                                                {medication?.drugTier || "N/A"}
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
            </div>
    );
}