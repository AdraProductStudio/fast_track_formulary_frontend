import { Form } from 'react-bootstrap'

const Checkbox = ({
    formType, formLabel, formClassName, formId,
    formName, change, formChecked, formValue, inputError
}) => {

    return (
        <>
            <Form.Check
                type={formType}
                label={formLabel}
                id={formId}
                name={formName}
                className={formClassName}
                onChange={change}
                checked={formChecked}
                value={formValue}
            />

            {inputError ? <div className='error_label'> {inputError} </div> : null}
        </>
    )
}

export default Checkbox