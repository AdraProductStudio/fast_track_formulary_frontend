"use client"

import { usePathname, useRouter } from "next/navigation";
import ButtonComponent from "~/components/Button/Button";
import Image from "~/components/Image";
import Icons from "~/public/icons";
import { vector_icons } from "~/public/svg";

export default function searchDetails() {
    const router = useRouter();
    const pathname = usePathname();

    const alternatives_medications = [
        {
            "drugID": 203552,
            "medicalConditionID": 138,
            "medicalConditionID2": 138,
            "medicalConditionName": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "medicalConditionName2": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "drugName": "acamprosate calcium oral tablet delayed release 333 mg",
            "requirements": "MO",
            "quantityLimit": null,
            "isBranded": false,
            "isActive": true,
            "isAlternative": false,
            "tierLevel": "2"
        },
        {
            "drugID": 203552,
            "medicalConditionID": 138,
            "medicalConditionID2": 138,
            "medicalConditionName": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "medicalConditionName2": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "drugName": "acamprosate calcium oral tablet delayed release 333 mg",
            "requirements": "MO",
            "quantityLimit": null,
            "isBranded": false,
            "isActive": true,
            "isAlternative": false,
            "tierLevel": "2"
        },
        {
            "drugID": 203552,
            "medicalConditionID": 138,
            "medicalConditionID2": 138,
            "medicalConditionName": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "medicalConditionName2": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "drugName": "acamprosate calcium oral tablet delayed release 333 mg",
            "requirements": "MO",
            "quantityLimit": null,
            "isBranded": false,
            "isActive": true,
            "isAlternative": false,
            "tierLevel": "2"
        },
        {
            "drugID": 203552,
            "medicalConditionID": 138,
            "medicalConditionID2": 138,
            "medicalConditionName": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "medicalConditionName2": "ANTI-ADDICTION/SUBSTANCE ABUSE TREATMENT AGENTS",
            "drugName": "acamprosate calcium oral tablet delayed release 333 mg",
            "requirements": "MO",
            "quantityLimit": null,
            "isBranded": false,
            "isActive": true,
            "isAlternative": false,
            "tierLevel": "2"
        }
    ]

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
                    <div className="d-flex flex-wrap mt-3">
                        {alternatives_medications?.map((medication, index) => (
                            <div className="col-12 col-md-6 col-lg-4 col-xxl-3 p-2" key={index} onClick={() => router.push(pathname + "/search_details")}>
                                <div className="card custom_card_shadow h-100 med_suggestion_list_card">
                                    <div className="card-body">
                                        <p className="mb-2"> {medication?.drugName || ""}</p>

                                        <div className="border-bottom">
                                            <p className="para_three mb-2">ID: {medication?.drugID || ""}</p>
                                        </div>

                                        <div className="mt-3 d-flex flex-wrap border-bottom pb-3">
                                            <div className="col-12 medical_condition_name mb-4">
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

                                        <div className="pt-3">
                                            <div className="custom_card_success ">
                                                Generic
                                                DMARD
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}