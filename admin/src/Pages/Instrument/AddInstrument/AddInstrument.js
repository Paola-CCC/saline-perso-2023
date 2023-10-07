import React, { useState } from 'react';
import axios from 'axios';
import './AddInstrument.css';

const AddInstrument = () => {
  const [instrumentName, setInstrumentName] = useState('');

  const handleAddInstrument = () => {
    const newInstrument = {
      name: instrumentName
    };

    axios.post(process.env.REACT_APP_API_URL+'/new-instrument', newInstrument)
      .then(response => {
        console.log('Instrument created successfully');
      })
      .catch(error => {
        console.error('Error adding instrument', error);
      });
  };

  return (
    <div className='container-page-add-instrument-cont'>
      <h1 className='title-page-add-instrument'>Ajouter un instrument</h1>
      <div className='container-input-addinstrument'>
        <label><strong>Nom:</strong></label>
        <input className='input-add-instrument' type="text" value={instrumentName} onChange={e => setInstrumentName(e.target.value)} />
         <button className='btn-add-instruments-b' onClick={handleAddInstrument}>Ajouter l'instrument</button>
      </div>
    </div>
  );
};

export default AddInstrument;
