const ButtonComponent = ({
    title, buttonName, as,
    className, type,
    onClick, disabled,
    children
}) => {

    return (
        <button
            as={as}
            type={type || "button"}
            className={`btn ${className}`}
            onClick={onClick}
            title={title}
            disabled={disabled}
        >
            {children || buttonName}
        </button>
    );
};

export default ButtonComponent;