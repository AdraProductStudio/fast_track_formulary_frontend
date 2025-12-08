"use client"

import { useRouter } from "next/navigation";
import ButtonComponent from "~/components/Button/Button";
import Icons from "~/public/icons";

export default function searchDetails() {
    const router = useRouter();

    return (
        <div className="h-100 med_search_result">
            <div className="card med_search_result_card custom_card_shadow">
                <div className="card-body med_details_page_content">
                    <ButtonComponent className="btn-transparent ps-0" onClick={() => router.back()}>
                        <span className="pe-2">{Icons.left_arrow_white}</span>
                        Back to search
                    </ButtonComponent>

                    <div className="ps-2 py-2">
                        <h5 className="mb-3">
                            Humira
                            <span className="heading_tire_primary_badge ms-3">Tier 5</span>
                        </h5>
                        <p className="para_three">Praluent, Blue cross, standard Formulary</p>
                    </div>

                    <div className="d-flex flex-wrap">
                        <div className="col">
                            <div className="card h-100 custom_card_shadow">
                                <div className="card-body">
                                    <h6>Current medications</h6>
                                    <h3 className="current_medication_font">{Icons.dollars_icon}6,000 - {Icons.dollars_icon}8,000
                                        <span className="text-secondary ps-2">/month</span>
                                    </h3>

                                    <div className="card mt-4 border rounded-4 overflow-hidden">
                                        <div className="card-header border-0 current_medication_left_side_header">
                                            Summary of coverage requirements
                                        </div>
                                        <div className="card-body">
                                            <table className="table current_medication_left_side_table">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th className="text-end">Brand</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Tier</td>
                                                        <td className="text-end">Tier 5 (Specialty)</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Indication</td>
                                                        <td className="text-end">Tier 5 (Specialty)</td>
                                                    </tr>
                                                    <tr className="">
                                                        <td>Restrictions</td>
                                                        <td className="text-end">Tier 5 (Specialty)</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="alternate_medications_width">
                            <div className="card h-100 custom_card_shadow">
                                <div className="card-body">
                                    <div className="shadow-sm border rounded-3">
                                        <div className="p-3 d-flex flex-wrap align-items-center">
                                            <div className="col">
                                                <h6 className="text-primary mb-0">Show Alternatives</h6>
                                            </div>
                                            <div className="col">
                                                <ButtonComponent className="btn-transparent float-end">
                                                    +
                                                </ButtonComponent>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}