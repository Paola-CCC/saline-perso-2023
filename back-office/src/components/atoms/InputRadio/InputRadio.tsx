import React, { useEffect, useState } from "react";
import "./InputRadio.scss";

interface Option {
  value: number;
  label: string;
}

interface InputRadioProps {
  labelRadioGroup?: string;
  options: Option[]; 
  getValues: (updatedOptions: any) => void;
}

const InputRadio : React.FC <InputRadioProps> = ({labelRadioGroup, options,getValues}) => {

  const [selectedOptions, setSelectedOptions] = useState<number | null>(null);

  useEffect(() => {
    getValues(selectedOptions);
  })

  return (
    <>
      {labelRadioGroup && labelRadioGroup !== undefined  && (
      <label>{labelRadioGroup}</label>
      )}
      <div className="radio-zone">
        {options.map((option) => (
          <label key={option.value} className="">
            <input
              type="radio"
              value={option.value}
              checked={selectedOptions === option.value}
              onChange={() => setSelectedOptions(option.value)}
              name={option.label}
            />
            <span > {option.label} </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default InputRadio;
