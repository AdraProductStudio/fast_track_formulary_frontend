function AlternativeMedicationCardSkeleton({ className = "" }) {

    return (
        Array.from({ length: 4 }).map((_, index) =>
            <div className={`placeholder-glow ${className}`} key={index}>
                <div className="card custom_card_shadow h-100 med_suggestion_list_card">
                    <div className="card-body">
                        <div className="mb-2 placeholder rounded-2" style={{ width: "80%", height: "25px" }}></div>

                        <div className="border-bottom">
                            <div className="mb-2 placeholder rounded-2" style={{ width: "30%", height: "25px" }}></div>
                        </div>

                        <div className="mt-3 d-flex flex-wrap border-bottom pb-3">
                            <div className="col-12 mb-3">
                                <div className="placeholder rounded-2" style={{ width: "100%", height: "25px" }}></div>
                            </div>

                            <div className="col-8 border-end pe-3">
                                <h6>
                                    <div className="mb-2 placeholder rounded-2" style={{ width: "30%", height: "25px" }}></div>
                                </h6>
                                <div className="placeholder rounded-2" style={{ width: "100%", height: "25px" }}></div>
                            </div>
                            <div className="col ps-3">
                                <h6>
                                    <div className="mb-2 placeholder rounded-2" style={{ width: "50%", height: "25px" }}></div>
                                </h6>
                                <div className="placeholder rounded-2" style={{ width: "100%", height: "25px" }}></div>
                            </div>
                        </div>

                        <div className="pt-3">
                            <div className="placeholder rounded-2" style={{ width: "50%", height: "25px" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

function AlternativeMedicationTableSkeleton({ className }) {
    return (
        <div className={`placeholder-glow ${className || ""}`}>
            <table className="table current_medication_left_side_table">
                <tbody>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <tr key={i}>
                            <td>
                                <span className="placeholder rounded-2 w-100 d-block" style={{ height: "25px" }}></span>
                            </td>
                            <td className="text-end">
                                <span className="placeholder rounded-2 w-75 d-inline-block" style={{ height: "25px" }}></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export { AlternativeMedicationCardSkeleton, AlternativeMedicationTableSkeleton };