import { Fragment } from "react";
import Select from "react-dropdown-select";

const ReactDropdownSelect = ({
    name,
    is_mandatory,
    multi,
    options,
    value,
    change,
    labelField,
    valueField,
    className,
    create,
    disabled,
    placeholder,
    dropdownPosition,
    color,
    labelClassName
}) => {

    return (
        <Fragment>
            {name ? (
                (() => {
                    const [mainLabel, extraLabel] = name.includes("(")
                        ? name.split("(")
                        : [name, null];

                    return (
                        <h6 className={labelClassName}>
                            {mainLabel.trim()}{" "}
                            {is_mandatory && (
                                <span className="brand_mandatory_color me-1">*</span>
                            )}
                            {extraLabel && (
                                <span style={{ fontWeight: 500 }}>
                                    ({extraLabel.trim().replace(")", "")})
                                </span>
                            )}
                        </h6>
                    );
                })()
            ) : null}

            <Select
                multi={multi}
                color={color}
                options={options}
                labelField={labelField}
                valueField={valueField}
                create={create}
                values={value}
                onChange={change}
                className={`${className} ${disabled ? "dropdown-disabled" : ""}`}
                disabled={disabled}
                placeholder={placeholder}
                dropdownPosition={dropdownPosition}
            />
        </Fragment>
    );
};

export default ReactDropdownSelect;