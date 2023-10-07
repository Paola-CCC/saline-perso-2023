import React, { useState } from "react";
import "./InputSelect.scss";


interface Option {
  value: number;
  label: string;
}

interface InputSelectProps {
  label?: string;
  options: Option[]; 
  getValues: (updatedOptions: any) => void;
}


const InputSelectMM : React.FC <InputSelectProps> = ({ label, options, getValues }) => {

  const [selectedOptions, setSelectedOptions] = useState<number | string | null>(null);

  return (
    <div className="input-select-container">
      {label && (
        <label>{label}</label>
      )}
      <select value={selectedOptions === null ? '' : selectedOptions} onChange={(e) => setSelectedOptions(e.target.value)}>
        {options.map((option , index) => (
          <option key={index} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelectMM;
