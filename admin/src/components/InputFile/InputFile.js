import React from "react";
import "./InputFile.css";

const InputFile = ({ onFileChange }) => {
  return (
    <div className="container-inputFile">
        <label  htmlFor="file-image" className="form-label">Changer la photo de couverture</label>
        <input className="form-control" type="file" id="file-image" name="file-image" onChange={onFileChange} required={true}   accept=".jpg, .jpeg, .png" />
    </div>
  );
};

export default InputFile;
