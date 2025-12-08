import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

const InputGroupComponent = ({
    icon, placeholder,
    type = "text", name, label,
    htmlFor, mandatory,
    labelClassName = "", inputError,
    className = "", change,
    keyDown, value, disabled, autoComplete
}) => {
    const [is_eye_open, set_is_eye_open] = useState(false);

    return (
        <>
            {label && (
                <Form.Label htmlFor={htmlFor} className={`form-label ${labelClassName || ''}`}>
                    {label}
                    {mandatory && <span className="brand_mandatory_color ms-1">*</span>}
                </Form.Label>
            )}

            <InputGroup>
                {icon && <InputGroup.Text id={`${htmlFor}-addon`} className='p-3'>{icon}</InputGroup.Text>}
                <Form.Control
                    type={is_eye_open ? 'text' : type}
                    placeholder={placeholder}
                    id={htmlFor}
                    name={name}
                    aria-describedby={`${htmlFor}-addon`}
                    className={`${className || ""} form-control`}
                    onChange={change}
                    onKeyDown={keyDown}
                    value={value}
                    disabled={disabled}
                    autoComplete={autoComplete || "off"}
                />
                {
                    type === "password" &&
                    <InputGroup.Text id={`${htmlFor}-addon`} className='p-3' onClick={() => set_is_eye_open(!is_eye_open)}>
                        {is_eye_open ? <IoEyeOutline size={25} /> : <IoEyeOffOutline size={25} />}
                    </InputGroup.Text>
                }
            </InputGroup>

            {inputError && (
                <div className="error_label">{inputError}</div>
            )}
        </>
    );
};

export default InputGroupComponent;
