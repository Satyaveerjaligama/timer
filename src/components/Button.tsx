interface ButtonProps {
  disabled?: boolean;
  buttonLabel: string;
  variant: "filled" | "outlined";
  type: "submit" | "button";
  startIcon?: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
}

/* 
This is button component that can be used in the whole application.
Replaced all instances of similar buttons in the app with this component
*/
const Button = (props: ButtonProps) => {
  const {
    disabled,
    buttonLabel,
    variant,
    type,
    onClick,
    startIcon,
    className,
  } = props;
  return (
    <button
      type={type}
      className={`button ${variant}-button ${
        disabled && "disabled-button"
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon}
      {buttonLabel}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  variant: "filled",
  type: "button",
};
