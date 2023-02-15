import * as React from "react";
import "./TextInput.css";

interface TextInputProps {
  id: string;
  label: string;
  initialValue: string;
  onValueChange: (newValue: string) => void;
  placeholder?: string;
  maxLength?: number;
  classNames?: string;
}

const TextInput = ({
  id,
  label,
  initialValue,
  onValueChange,
  placeholder,
  maxLength,
  classNames,
}: TextInputProps) => {
  return (
    <div className={`ti-container ${classNames}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        value={initialValue}
        onChange={(e) => {
          onValueChange(e.target.value);
        }}
        maxLength={maxLength || 11}
        placeholder={placeholder}
        id={id}
        aria-describedby={id}
        autoComplete="nope"
      />
    </div>
  );
};

export default TextInput;
