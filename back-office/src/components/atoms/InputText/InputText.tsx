import React from "react";
import "./InputText.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";


interface InputTextProps {
  label?: string,
  value?: string,
  placeholder?: string,
  isRequired?: boolean,
  name?: string,
  errorText?: string,
  type?: 'search' | 'text' | 'password'
  onChange: (updatedOptions: any) => void;
}

const InputText: React.FC<InputTextProps> = ({ label, placeholder, value, type, isRequired, name, errorText, onChange }) => {

  // const [selectedOption, setSelectedOption] = useState<string>('');

  // useEffect(() => {
  //   getValues(selectedOption);
  // })

  const btnClassInput = classNames("grp-input-search", {
    inputText: type === "text",
    inputSearch: type === "search",
  });

  return (
    <>
      {label && label !== '' && (
        <label className="input-text">{label}</label>
      )}

      <div className={btnClassInput} tabIndex={1}>
        {
          type && type === 'search' &&
          <button type="submit" className="icon-search" tabIndex={-1}>
            <FontAwesomeIcon icon={faSearch} flip="horizontal" />
          </button>
        }
        <input
          type={ type !== 'text' ? type : 'text' }
          className="input-search-input"
          value={value}
          placeholder={placeholder}
          name={name}
          required={isRequired}
          onChange={onChange}
          tabIndex={0}
        />

        { errorText && errorText !== "" && (
          <span> { errorText } </span>
        )}
      </div>
    </>

  );
};

export default InputText;