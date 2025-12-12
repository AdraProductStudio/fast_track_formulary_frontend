export default function AlternativeMedicationCardSkeleton() {

    return (
        Array.from({ length: 4 }).map((_, index) =>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3 p-2 placeholder-glow" key={index}>
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