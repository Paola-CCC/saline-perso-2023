import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditInstrument.css';

const EditInstrument = () => {
  const { instrumentId } = useParams();
  const navigate = useNavigate();
  const [instrumentName, setInstrumentName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+`/instruments/${instrumentId}`)
      .then(response => {
        const instrumentData = response.data;
        setInstrumentName(instrumentData.name);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading instrument details', error);
        setIsLoading(false);
      });
    },[instrumentId]);

  const handleSubmit = async () => {
    try {
      const updatedInstrument = {
        name: instrumentName,
      };
      await axios.put(process.env.REACT_APP_API_URL+`/instruments/${instrumentId}`, updatedInstrument);
      navigate('/instruments');
    } catch (error) {
      console.error('Error updating instrument details', error);
    }
  };
  return (
    <div className='update-instrument'>
      <h1 className='title-page'>Mettre à jour l'instrument</h1>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div className='content-edit-instrument'>
          <label><strong>Nom de l'instrument:</strong></label>
          <input className='input-edit-instrument' type='text' value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)} />
          <button className='btn-edit-instrument' onClick={handleSubmit}>Mettre à jour l'instrument</button>
        </div>
      )}
    </div>
  );
};

export default EditInstrument;
