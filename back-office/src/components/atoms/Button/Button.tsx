import React, { ReactNode, MouseEvent } from "react";
import "./Button.scss";
import classNames from "classnames";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  onClick,
  disabled = false,
  id,
}) => {
  const btnClass = classNames("button", {
    primary: className === "primary",
    secondary: className === "secondary",
    tertiary: className === "tertiary",
  });

  return (
    <button
      className={btnClass}
      type={type}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
