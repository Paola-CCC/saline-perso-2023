import React from 'react';

const InputText = ({ labelText, className, value, onChange }) => {
    return (
        <div>
            <label><strong>{labelText}:</strong></label>
            <input className={className} type='text' value={value} onChange={onChange} />
        </div>
    );
}

export default InputText;
