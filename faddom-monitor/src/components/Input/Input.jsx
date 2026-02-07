import React from "react";
import "./Input.css";

export default function Input({ text, placeholder, type, value, onChange }) {
  return (
    <div className="input-container">
      <h3>{text}</h3>
      <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
