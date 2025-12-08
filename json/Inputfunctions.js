"use client";
import { Fragment } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import ReactDropdownSelect from "~/components/Inputs/ReactDropdownSelect";
import SelectBox from "~/components/Inputs/SelectBox";
import Input from "~/components/Inputs/Input";
import Textbox from "~/components/Inputs/textbox";
import Icons from "~/public/icons";
import Checkbox from "~/components/Inputs/Checkbox";
import ButtonComponent from "~/components/Button/Button";
import Password from "~/components/Inputs/Password";
import InputGroupComponent from "~/components/Inputs/InputGroup";
import { ButtonTypeSelect } from "~/components/Inputs/ButtonTypeSelect";
import SpinnerComponent from "~/components/Spinner/Spinner";
import GooglePlaceInput from "~/components/GoogleApi/GooglePlacesLoader";

export function Inputfunctions(funBy) {
    if (!funBy || funBy.length === 0) return null;
    let imageFiles = [];
    let documentFiles = [];

    return funBy?.map((ipVal, iPInd) => {
        const uniqueKey = `${ipVal?.category || "input"}_${iPInd}`;

        switch (ipVal?.category) {
            case "heading":
                return (
                    <div className={ipVal?.parent_style} key={uniqueKey}>
                        {iPInd !== 0 ? <hr className="bg-secondary" /> : null}
                        <h5>{ipVal?.title}</h5>
                    </div>
                );

            case "divider":
                return (
                    <div className={ipVal?.parent_style} key={uniqueKey}>
                        <hr
                            className="brand_color"
                            style={{ border: ipVal?.style || "" }}
                        />
                    </div>
                );

            case "select":
                switch (ipVal?.type) {
                    case "button_design_select":
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <ButtonTypeSelect
                                    option={ipVal?.options}
                                    value={ipVal?.value}
                                    change={ipVal?.onChange}
                                    label={ipVal?.name}
                                    labelClassName={ipVal?.labelClassName || ""}
                                    mandatory={ipVal?.is_mandatory}
                                    childClassName={ipVal?.childClassName || ""}
                                    childContentClassName={ipVal.childContentClassName || ""}
                                    inputError={ipVal?.Err}
                                />
                            </div>
                        );

                    case "normal_select":
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <SelectBox
                                    selectOptions={ipVal?.options}
                                    value={ipVal?.value}
                                    change={ipVal?.onChange}
                                    label={ipVal?.name}
                                    labelClassName={ipVal?.labelClassName || ""}
                                    mandatory={ipVal?.is_mandatory}
                                    disableSelectBox={ipVal?.disabled}
                                    className={`rounded ${ipVal?.child_style || ""}`}
                                />
                                {ipVal?.Err && (
                                    <div className="error_label">{ipVal?.Err}</div>
                                )}
                            </div>
                        );

                    case "react_dropdown_select":
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <ReactDropdownSelect
                                    multi={ipVal?.multi}
                                    name={ipVal?.name}
                                    color={ipVal?.color}
                                    dropdownPosition={ipVal?.dropdownPosition}
                                    is_mandatory={ipVal?.is_mandatory}
                                    options={ipVal?.options}
                                    labelField={ipVal?.labelField}
                                    valueField={ipVal?.valueField}
                                    create={ipVal?.create}
                                    value={ipVal?.value}
                                    change={ipVal?.onChange}
                                    className={ipVal?.child_style}
                                    disabled={ipVal?.disabled}
                                    labelClassName={ipVal?.labelClassName || ""}
                                    placeholder={ipVal?.placeholder}
                                />
                                {ipVal?.Err && (
                                    <div className="error_label">{ipVal?.Err}</div>
                                )}
                            </div>
                        );

                    default:
                        return null;
                }

            case "input":
                if (ipVal?.type === "file" && Array.isArray(ipVal?.value)) {
                    imageFiles = ipVal?.value?.filter((data) => {
                        if (typeof data === "string") return true;
                        return /\.(jpg|jpeg|png|gif|svg)$/i.test(data?.name);
                    });

                    documentFiles = ipVal?.value?.filter(
                        (data) =>
                            typeof data !== "string" &&
                            /\.(pdf|docx?|ods|csv|xlsx|txt)$/i.test(data?.name)
                    );
                }

                switch (ipVal?.type) {
                    case "file":
                        return (
                            <Fragment key={`file_fragment_${iPInd}`}>
                                <div className={`cursor-pointer ${ipVal?.parent_style} ${ipVal?.value?.length >= ipVal?.fileLength ? "pe-none" : ""}`} onClick={() => document.getElementById("file_upload").click()} key={`file_upload_${iPInd}`} >
                                    <Input
                                        type={ipVal?.type}
                                        change={ipVal?.onChange}
                                        label={ipVal?.name}
                                        labelClassName={ipVal?.labelClassName || ""}
                                        mandatory={ipVal?.is_mandatory}
                                        className={`d-none ${ipVal?.inputClassName}`}
                                        htmlFor="file_upload"
                                        multiple={ipVal?.multiple}
                                        inputError={ipVal?.Err}
                                        disabled={ipVal?.disabled}
                                        accept={ipVal?.accept}
                                        id="file_upload"
                                    />

                                    <div className={`border py-3 rounded-2 col-12 text-center ${ipVal?.child_style || ""} ${ipVal?.disabled ? "bg-opacity-25" : ""}`}>
                                        <span className="me-2">{Icons.fileUploadIcon}</span>
                                        <span className={ipVal?.labelClassName || ""} >
                                            {ipVal?.placeholder}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-1 w-100">
                                    {/* ================== String ================== */}
                                    {typeof ipVal?.value === "string" ? (
                                        <div className="images-section mb-4" key={`file_string_${iPInd}`}>
                                            <div className="d-flex flex-wrap w-100 align-items-center">
                                                <div className="col-3 text-center">
                                                    {Icons?.fileUploadIcon_lg}
                                                </div>
                                                <div className="col-9 d-flex flex-wrap">
                                                    <div className="col-9">{ipVal?.value}</div>
                                                    <div className="col-3 text-end">
                                                        <ButtonComponent
                                                            type="button"
                                                            className="btn_brand_color w-100"
                                                            onClick={ipVal?.resume_delete_spinner ? null : () => ipVal?.deleteImg()}
                                                            title="Delete" >
                                                            {ipVal?.resume_delete_spinner ? <SpinnerComponent /> : "Delete"}
                                                        </ButtonComponent>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* ================== Images ================== */}
                                    {imageFiles.length > 0 && (
                                        <div className="images-section mb-4">
                                            {imageFiles.map((data, index) => {
                                                if (typeof data === "string") {
                                                    return (
                                                        <div
                                                            className="d-flex flex-wrap w-100"
                                                            key={`image_string_${iPInd}_${index}`}
                                                        >
                                                            <div className="col-3">
                                                                <img src={data} alt="uploaded" />
                                                            </div>
                                                            <div className="col-9 d-flex flex-wrap">
                                                                <div className="col-9">
                                                                    <h6>{data?.split("/").pop()}</h6>
                                                                </div>
                                                                <div className="col-3 text-end">
                                                                    <ButtonComponent
                                                                        type="button"
                                                                        className="btn_brand_color w-100"
                                                                        title="Delete"
                                                                        onClick={() => ipVal?.deleteImg(index)} >
                                                                        Delete
                                                                    </ButtonComponent>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                const { id, name: filename } = data;
                                                const previewUrl = URL.createObjectURL(data);

                                                return (
                                                    <div
                                                        className="d-flex flex-wrap w-100 align-items-center"
                                                        key={`image_file_${iPInd}_${id || index}`}
                                                    >
                                                        <div className="col-3">
                                                            <img
                                                                src={previewUrl}
                                                                alt={filename}
                                                                width="130rem"
                                                                height="100rem"
                                                                className="img-fluid rounded-4"
                                                            />
                                                        </div>
                                                        <div className="col-9 d-flex flex-wrap">
                                                            <div className="col-9">
                                                                <h6>{filename}</h6>
                                                            </div>
                                                            <div className="col-3 text-end">
                                                                <ButtonComponent
                                                                    type="button"
                                                                    className="btn_brand_color w-100"
                                                                    onClick={() => ipVal?.deleteImg(index)}
                                                                    title="Delete">
                                                                    Delete
                                                                </ButtonComponent>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* ================== Documents ================== */}
                                    {documentFiles.length > 0 && (
                                        <div className="w-100">
                                            {documentFiles.map((data, index) => {
                                                const { id, name: filename } = data;
                                                return (
                                                    <div
                                                        className="d-flex flex-wrap w-100 align-items-center"
                                                        key={`doc_file_${iPInd}_${id || index}`}
                                                    >
                                                        <div className="col-3 text-center">
                                                            {Icons?.fileUploadIcon_lg}
                                                        </div>
                                                        <div className="col-9 d-flex flex-wrap">
                                                            <div className="col-9">
                                                                <h6 className="mt-2">{filename}</h6>
                                                            </div>
                                                            <div className="col-3 text-end">
                                                                <ButtonComponent
                                                                    type="button"
                                                                    className="btn_brand_color w-100"
                                                                    onClick={() => ipVal?.deleteImg(index)}
                                                                    title="Delete" >
                                                                    Delete
                                                                </ButtonComponent>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {ipVal?.Err ? (
                                    <div className="error_label">
                                        {ipVal?.Err}
                                    </div>
                                ) : null}
                            </Fragment>
                        );

                    case "password":
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <Password
                                    label={ipVal?.name}
                                    value={ipVal?.value}
                                    change={ipVal?.onChange}
                                    autoComplete={ipVal?.autoComplete}
                                    keyDown={ipVal?.onkeydown}
                                    labelClassName={ipVal?.labelClassName || ""}
                                    mandatory={ipVal?.is_mandatory}
                                    className={ipVal?.child_style}
                                    placeholder={ipVal?.placeholder}
                                    inputError={ipVal?.Err}
                                />
                            </div>
                        );

                    case "input_group":
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <InputGroupComponent
                                    name={ipVal?.name}
                                    label={ipVal?.title}
                                    type={ipVal?.input_type}
                                    value={ipVal?.value}
                                    change={ipVal?.onChange}
                                    keyDown={ipVal?.onkeydown}
                                    autoComplete={ipVal?.autoComplete}
                                    icon={ipVal?.icon}
                                    labelClassName={ipVal?.labelClassName || ""}
                                    mandatory={ipVal?.is_mandatory}
                                    className={ipVal?.child_style}
                                    placeholder={ipVal?.placeholder}
                                    inputError={ipVal?.Err}
                                    disabled={ipVal?.disabled}
                                />
                            </div>
                        );

                    default:
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <Input
                                    type={ipVal?.type}
                                    value={ipVal?.value}
                                    change={ipVal?.onChange}
                                    keyDown={ipVal?.onkeydown}
                                    label={ipVal?.title}
                                    autoComplete={ipVal?.autoComplete}
                                    labelClassName={ipVal?.labelClassName || ""}
                                    mandatory={ipVal?.is_mandatory}
                                    inputError={ipVal?.Err}
                                    disabled={ipVal?.disabled}
                                    eyeFunction={ipVal?.eyeFunction}
                                    eyeIcon={ipVal?.eyeIcon}
                                    className={ipVal?.child_style}
                                    placeholder={ipVal?.placeholder}
                                    max={
                                        ipVal?.name === "To Date" || ipVal?.name === "From Date"
                                            ? new Date().toISOString().split("T")[0]
                                            : null
                                    }
                                    min={
                                        ipVal?.name === "Next call date"
                                            ? new Date().toISOString().split("T")[0]
                                            : null
                                    }
                                    readOnly={ipVal?.readOnly}
                                />
                            </div>
                        );
                }

            case "Checkbox":
                return (
                    <div className={ipVal?.parent_style} key={uniqueKey}>
                        <h6>{ipVal?.title}</h6>
                        {ipVal?.options?.map((option, idx) => (
                            <div className={ipVal?.child_style} key={`${uniqueKey}_option_${idx}`}>
                                <Checkbox
                                    formType={ipVal?.type}
                                    formLabel={option}
                                    formClassName={`mb-0`}
                                    formId={option}
                                    formName={ipVal?.type === "checkbox" ? option : "radio_option"}
                                    change={ipVal?.onChange}
                                    formChecked={ipVal?.value?.includes(option)}
                                    formValue={ipVal?.value}
                                    inputError={ipVal?.Err}
                                />
                            </div>
                        ))}
                    </div>
                );

            case "textbox":
                return (
                    <div className={ipVal?.parent_style} key={uniqueKey}>
                        <Textbox
                            value={ipVal?.value}
                            change={ipVal?.onChange}
                            cols={10}
                            rows={5}
                            className={`${ipVal?.child_style}`}
                            label={ipVal?.name}
                            labelClassName={ipVal?.labelClassName || ""}
                            mandatory={ipVal?.is_mandatory}
                            inputError={ipVal?.Err}
                            disabled={ipVal?.disabled}
                            textBoxClassName={ipVal?.textBoxClassName}
                            readOnly={ipVal?.readOnly}
                        />

                        {ipVal?.Err && (
                            <div className="error_label">{ipVal?.Err}</div>
                        )}
                    </div>
                );

            case "phone":
                return (
                    <div className={ipVal?.parent_style} key={uniqueKey}>
                        <PhoneInput
                            id={iPInd}
                            specialLabel={ipVal?.title}
                            name={ipVal?.name}
                            country={ipVal?.country_code || "us"}
                            dataTestid="mobileNumber"
                            countryCodeEditable={false}
                            enableSearch
                            onChange={ipVal?.onChange}
                            value={ipVal?.value}
                            inputClass="professional_phone_input"
                            buttonClass="custom_flag_btn"
                            dropdownClass="custom_dropdown"
                            containerClass="custom_container"
                            dropdown
                        />
                        {ipVal?.Err && (
                            <div className="error_label">
                                {ipVal?.Err}
                            </div>
                        )}
                    </div>
                );

            case "location":
                switch (ipVal?.type) {
                    case "multiple_location":
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <label
                                    htmlFor={`location_${iPInd}`}
                                    className={ipVal?.labelClassName || ""}
                                >
                                    {ipVal?.name}
                                    {ipVal?.is_mandatory ? (
                                        <span className="brand_mandatory_color ms-1">*</span>
                                    ) : null}
                                </label>

                                <div className="d-flex flex-wrap mt-1">
                                    {ipVal?.values?.map((locValue, locIndex) => (
                                        <div className="col-12 mb-2 filter_multiple_location_display" key={`loc_value_${locIndex}`}>
                                            <div className="col-10 ps-3">{locValue}</div>
                                            <div className="col-2">
                                                <ButtonComponent className="text-light" onClick={()=>ipVal?.delete_multiple_location(locValue)}>{Icons.close_icon}</ButtonComponent>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <GooglePlaceInput
                                    value={ipVal?.value || ""}
                                    onChange={ipVal?.onChange}
                                    onPlaceSelected={ipVal?.place_selected}
                                    placeholder={ipVal?.placeholder}
                                    className={ipVal?.child_style}
                                    disabled={ipVal?.values?.length === 5}
                                />
                                {ipVal?.Err && (
                                    <div className="error_label">{ipVal?.Err}</div>
                                )}
                            </div>
                        );


                    default:
                        return (
                            <div className={ipVal?.parent_style} key={uniqueKey}>
                                <label
                                    htmlFor={`location_${iPInd}`}
                                    className={ipVal?.labelClassName || ""}
                                >
                                    {ipVal?.name}
                                    {ipVal?.is_mandatory ? (
                                        <span className="brand_mandatory_color ms-1">*</span>
                                    ) : null}
                                </label>
                                <GooglePlaceInput
                                    value={ipVal?.value || ""}
                                    onChange={ipVal?.onChange}
                                    onPlaceSelected={ipVal?.place_selected}
                                    placeholder={ipVal?.placeholder}
                                    className={ipVal?.child_style}
                                />
                                {ipVal?.Err && (
                                    <div className="error_label">{ipVal?.Err}</div>
                                )}
                            </div>
                        );

                }
            default:
                return null;
        }
    });
}