import * as React from "react";
import "./Select.css";

interface SelectProps {
  label: string;
  initialSelectedOption: string;
  options: readonly string[];
  onOptionChange: (newValue: string) => void;
}

const labelToId = (label: string): string => label.replace(" ", "-");

const Select = ({
  label,
  initialSelectedOption,
  options,
  onOptionChange,
}: SelectProps) => {
  return (
    <div className="select-control">
      <label htmlFor={labelToId(label)}>{label}</label>
      <select
        id={labelToId(label)}
        value={initialSelectedOption}
        onChange={(event) => onOptionChange(event.target.value)}
      >
        {options.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
