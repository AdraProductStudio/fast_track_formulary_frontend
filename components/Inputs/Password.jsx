import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Password = ({
    className, htmlFor, placeholder,
    label, labelClassName,
    mandatory, inputError,
    change, value, keyDown,
    disabled
}) => {
    const [is_visible, set_is_visible] = useState(false);

    return (
        <div className='position-relative'>
            {label ?
                <Form.Label htmlFor={htmlFor} className={`form-label ${labelClassName}`}>
                    Password
                    {mandatory ? <span className='brand_mandatory_color ms-1'>*</span> : null}
                </Form.Label>
                :
                null}

            <Form.Control
                type={is_visible ? 'text' : 'password'}
                id={htmlFor}
                placeholder={placeholder}
                className={`${className} form-control`}
                onChange={change}
                onKeyDown={keyDown}
                value={value}
                disabled={disabled}
            />

            <span className='eye_button text-secondary' onClick={() => set_is_visible(!is_visible)}>
                {is_visible ? <IoEyeOutline /> : <IoEyeOffOutline/>}
            </span>
            {inputError ? <div className='error_label'> {inputError} </div> : null}
        </div>
    )
}

export default Password    