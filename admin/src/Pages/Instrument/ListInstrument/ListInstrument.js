import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListInstrument.css';

const ListInstrument = () => {
  const [instruments, setInstruments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'/instruments')
      .then(response => {
        setInstruments(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading instruments:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='instruments'>
      <div className='instruments-header-list'>
        <h1 className="title-pages">Liste des instruments</h1>
         <div className='add-intrument-list'>
            <Link className='a-list-instrument-btn' to="/add-instrument">
              <button className='add-btn-list'>Ajouter l'instrument</button>
            </Link>
          </div>
      </div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
          <div>
            <ul className="ul-listinstrument">
              {instruments.map(instrument => {
                return (
                  <li className="li-listinstrument" key={instrument.id}>
                    <p><strong>Nom de l'instrument: </strong>{instrument.name}</p>
                    <p><strong>Niveau:</strong> {instrument.level}</p>
                    <div className='btnlistinstrument'>
                      <Link className='a-list-instrument-btn' to={`/delete-instrument/${instrument.id}`}>
                        <button className='delete-btn-list'>Suppression</button>
                      </Link>
                      <Link className='a-list-instrument-btn' to={`/edit-instrument/${instrument.id}`}>
                        <button className='edit-btn-list'>Edition</button>
                      </Link>
                    </div>
                  </li>
                );
              })}
           </ul>
         </div>
       )}
    </div>
  );
};

export default ListInstrument;
