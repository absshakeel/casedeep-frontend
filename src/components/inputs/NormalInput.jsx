import { useRef } from "react";
import { Input } from "reactstrap";

const NormalInput = ({
  label,
  value,
  setValue,
  placeholder,
  type,
  disabled,
  className,
  style,
  inputClassName,
  onEnterPress,
}) => {
  const inputRef = useRef(null);

  return (
    <div
      className={`normal-input px-0 d-flex align-items-center ${className}`}
      style={style}
    >
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnterPress) {
            e.preventDefault();
            onEnterPress();
          }
        }}
        ref={inputRef}
        type={type}
        disabled={disabled}
        className={`bg-transparent border-none px-3 ${inputClassName}`}
        placeholder={placeholder || label}
        value={value || ""}
        onChange={(e) => setValue(e?.target?.value)}
      />
    </div>
  );
};

export default NormalInput;
