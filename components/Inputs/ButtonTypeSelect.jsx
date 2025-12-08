export const ButtonTypeSelect = ({
    label, labelClassName,
    value, option, change,
    mandatory, childClassName,
    childContentClassName, inputError
}) => {


    return (
        <div className="w-100 d-flex flex-wrap">
            <div className="col-12">
                {(() => {
                    // Split label text if it contains parentheses
                    const [mainLabel, extraLabel] = label?.includes("(") ? label.split("(") : [label, null];
                    return (
                        <h6 className={labelClassName}>
                            {mainLabel?.trim()}{" "}
                            {mandatory && (
                                <span className="brand_mandatory_color me-1">*</span>
                            )}
                            {extraLabel && (
                                <span style={{ fontWeight: 500 }}>
                                    ({extraLabel.trim().replace(")", "")})
                                </span>
                            )}
                        </h6>
                    );
                })()}
            </div>

            {option?.map((item, ind) => (
                <div className={childClassName} key={ind}>
                    <div className={`custom_button_design_select ${childContentClassName} ${value?.includes(item) ? 'active' : ''}`} onClick={() => change(item)}>
                        {item}
                    </div>
                </div>
            ))}

            {inputError && <div className="error_label w-100">
                {inputError}
            </div>}
        </div>
    )
}