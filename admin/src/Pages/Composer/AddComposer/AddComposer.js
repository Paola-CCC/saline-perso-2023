import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddComposer.css';

const AddComposer = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [biography, setBiography] = useState('');
  const [instrumentName, setInstrumentName] = useState('');
  const [availableInstruments, setAvailableInstruments] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'/instruments')
      .then(response => {
        setAvailableInstruments(response.data);
      })
      .catch(error => {
        console.error('Error loading instruments', error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const newComposer = {
        fullName,
        biography,
        instruments: [{ name: instrumentName }],
      };
      await axios.post(process.env.REACT_APP_API_URL+'/composer/new', newComposer);
      navigate('/composers');
    } catch (error) {
      console.error('Error creating composer', error);
    }
  };

  return (
    <div className='Composer-add-con'>
      <h1 className='title-page-add-composer'>Créer un compositeur</h1>
      <div className='pack-add-composer'>
        <label><strong>Nom et Prénom:</strong></label>
        <input className='input-add-composer' type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label><strong>Biographie:</strong></label>
        <textarea className='input-add-bio-composer' value={biography} onChange={(e) => setBiography(e.target.value)} />

        <div className='select-add-composer-cont'>
          <label><strong>Nom de l'instrument:</strong></label>
          <select className='select-add-composer' value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)}>
            <option value=''>Sélectionner un instrument</option>
            {availableInstruments.map(instrument => (
              <option key={instrument.id} value={instrument.name}>{instrument.name}</option>
            ))}
          </select>
        </div>

        <button className='btn-add-composer-act' onClick={handleSubmit}>Créer le compositeur</button>
      </div>
    </div>
  );
};

export default AddComposer;
