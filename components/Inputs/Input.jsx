import Form from 'react-bootstrap/Form';

const Input = ({
    className, htmlFor, type,
    placeholder, label, labelClassName,
    mandatory, inputError, change,
    multiple, value, keyDown,
    disabled, max, min, accept,
    name, readOnly, autoComplete
}) => {
    return (
        <div>
            {label ?
                <Form.Label htmlFor={htmlFor} className={`form-label ${labelClassName || ''}`}>
                    {label}
                    {mandatory ? <span className='brand_mandatory_color ms-1'>*</span> : null}
                </Form.Label>
                :
                null}

            <Form.Control
                type={type} id={htmlFor}
                accept={accept}
                placeholder={placeholder}
                className={`form-control ${className || ''}`}
                onChange={change}
                onKeyDown={keyDown}
                multiple={multiple}
                value={value}
                disabled={disabled}
                max={max} min={min}
                name={name}
                readOnly={readOnly}
                autoComplete={autoComplete || "off"}
            />
            {inputError && type !== 'file' ? <div className='error_label'> {inputError} </div> : null}
        </div>
    )
}

export default Input