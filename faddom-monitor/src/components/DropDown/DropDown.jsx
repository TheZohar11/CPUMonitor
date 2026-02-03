import React from "react";
import "./DropDown.css";

export default function DropDown({ options, onChange, value }) {
  return (
    <select
      className="drop-down"
      onChange={onChange}
      options={options}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
