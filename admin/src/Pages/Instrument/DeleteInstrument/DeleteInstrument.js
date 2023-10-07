import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './DeleteInstrument.css';
import axios from 'axios';

const DeleteInstrument = () => {
  const { instrumentId } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    axios.delete(process.env.REACT_APP_API_URL+`/instruments/${instrumentId}`)
      .then(response => {
        setIsDeleting(false);
      })
      .catch(error => {
        console.error('Error deleting instrument', error);
        setIsDeleting(false);
      });
  };

  return (
    <div className='instruments'>
      <h2 className='title-page-delete'>Suppression </h2>
      <p className='description-page'>Etes-vous sûr(e) de vouloir supprimer l'instrument ?</p>
      <div className='container-btn'>
        <button className='btn-delete-instrument' onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Suppression...' : 'Suppression'}
        </button>
      </div>
    </div>
  );
};

export default DeleteInstrument;