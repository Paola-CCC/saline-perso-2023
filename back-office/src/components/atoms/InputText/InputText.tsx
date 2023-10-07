import React, { useState, useEffect } from "react";
import "./InputText.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";


interface InputTextProps {
  label?: string,
  placeholder?: string
  getValues: (updatedOptions: any) => void;
  kind?: 'search' | 'text'
}

const InputText: React.FC<InputTextProps> = ({ label, placeholder, kind, getValues}) => {

  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    getValues(selectedOption);
  })
  
  const btnClassInput = classNames("grp-input-search", {
    inputText: kind === "text",
    inputSearch: kind === "search",

  });

  return (
    <>
      {label && label !== '' && (
        <label className="input-text">{label}</label>
      )}
  
      <div className={btnClassInput} tabIndex={1}>
        {
          kind && kind === 'search' &&
          <button type="submit" className="icon-search" tabIndex={-1}>
            <FontAwesomeIcon icon={faSearch} flip="horizontal" />
          </button>
        }
        <input
          type="text"
          className="input-search-input"
          value={selectedOption}
          placeholder={placeholder}
          name="search"
          onChange={(e) => setSelectedOption(e.target.value)}
          tabIndex={-1}
        />
      </div>
    
    </>

  );
};

export default InputText;