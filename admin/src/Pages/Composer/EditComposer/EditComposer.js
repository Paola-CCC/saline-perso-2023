import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditComposer.css'

const EditComposer = () => {
  const { composerId } = useParams();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [biography, setBiography] = useState('');
  const [instrumentName, setInstrumentName] = useState('');
  const [availableInstruments, setAvailableInstruments] = useState([]); 

  useEffect(() => {
      
    axios.get(process.env.REACT_APP_API_URL+`/composer/${composerId}`)
      .then((response) => {
        
        const composerData = response.data;
        setFullName(composerData.fullName);
        setBiography(composerData.biography);
        setInstrumentName(composerData.instruments);

        if (composerData.instrument && composerData.instrument.length > 0) {
          setInstrumentName(composerData.instrument[0].name);
        } else {
          setInstrumentName(''); 
        }
      })
      .catch((error) => {
        console.error('Error loading composer', error);
      });

    axios.get(process.env.REACT_APP_API_URL+'/instruments')
      .then((response) => {
        setAvailableInstruments(response.data);
      })
      .catch((error) => {
        console.error('Error loading instruments', error);
      });
  }, [composerId]);
  

  const handleSubmit = async () => {
      try {
        let instrumentId = null;
        availableInstruments.forEach(instrument => {
          if (instrument.name === instrumentName) {
            instrumentId = instrument.id;
          }
        });
  
        const updatedComposer = {
          fullName: fullName,
          biography: biography,
          instruments: [{ id: instrumentId, name: instrumentName }]
        };
    
      await axios.put(process.env.REACT_APP_API_URL+`/composer/${composerId}/edit`, updatedComposer);
      console.log('Composer updated successfully', updatedComposer);
      navigate('/composers');
    } catch (error) {
      console.error('Error updating composer', error);
    }
  };
  return (
    <div className='container-edit-composer-page'>
      <h1 className='title-edit-composer-page'>Modifier le compositeur</h1>
      <div className='pack-container-edit-composer'>
        <label><strong>Nom complet :</strong></label>
        <input className='input-edit-composer-name' type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label><strong>Biographie :</strong></label>
        <textarea className='input-edit-composer-bio' value={biography} onChange={(e) => setBiography(e.target.value)} />
      
        <div className='pack-select-name-instrument'>
          <label><strong>Nom de l'instrument:</strong></label>
          <select className='select-name-instrument' value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)}>
              <option value=''>Sélectionner un instrument</option>
              {availableInstruments.map(instrument => (
                <option key={instrument.id} value={instrument.name}>{instrument.name}</option>
              ))}
          </select>
        </div>
      </div>
      
      <button className='btn-edit-composer' onClick={handleSubmit}>Mettre à jour le compositeur</button>
    </div>
  );
};

export default EditComposer;
