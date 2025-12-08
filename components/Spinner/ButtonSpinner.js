
import ButtonComponent from '../Button/Button'
import SpinnerComponent from './Spinner'

const ButtonSpinner = ({ is_spinner, title, className, disabled, onClick, children }) => {

  return (
    <ButtonComponent
      type="button"
      onClick={is_spinner ? null : onClick}
      className={`${className ? className : ''}`}
      buttonName={is_spinner ?
        <div className='row align-items-center justify-content-between'>
          <div className='col text-start ps-3 text-truncate'>
            {title || children || 'Loading...'}
          </div>
          <div className='border-start text-center button_spinner_div'>
            <SpinnerComponent />
          </div>
        </div>
        :
        <div className='col-12 text-center'>
          {title || children || 'Submit'}
        </div>
      }
      disabled={disabled || false}
    />
  )
}

export default ButtonSpinner