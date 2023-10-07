import React, { useEffect, useState } from "react";
import "./InputGroupCheckbox.scss";

interface Option {
  value: number;
  label: string;
}

interface InputGroupCheckboxProps {
  labelCheckboxGroup?: string;
  options: Option[]; 
  getValues: (updatedOptions: any) => void;
}

const InputGroupCheckbox: React.FC<InputGroupCheckboxProps> = ({ labelCheckboxGroup, options, getValues }) => {
  
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleCheckboxChange = (option : number) => {
    if(selectedOptions.includes(option) ){
      let newArray = selectedOptions.filter((valueChecked) => valueChecked !== option );
      setSelectedOptions([]);
      setSelectedOptions([...newArray]);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    getValues(selectedOptions);
  })

  return (
    <>

      {labelCheckboxGroup && labelCheckboxGroup !== undefined && (
        <label>{labelCheckboxGroup}</label>
      )}
      <div className="checkbox-wrapper">
        {options.map((option) => (
          <label key={option.value} className="form-control"  >
            <input
              type="checkbox"
              value={option.value}
              name="checkbox-checked"
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />            
            <span> {option.label} </span>
          </label>
        ))}
      </div>
    </>
  );
};

export default InputGroupCheckbox;


