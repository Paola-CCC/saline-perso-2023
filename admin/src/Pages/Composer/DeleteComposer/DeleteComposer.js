import React, { useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';
import './DeleteComposer.css';

const DeleteComposer = () => {
  const { composerId } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteComposer = () => {
    setIsDeleting(true);
    axios.delete(process.env.REACT_APP_API_URL+`/composer/${composerId}`)
      .then(response => {
        setIsDeleting(false);
        console.log('Deleting successfully');
        navigate('/composers');
      })
      .catch(error => {
        console.error('Error deleting composer', error);
        setIsDeleting(false);
      });
  };
  return (
    <div className='container-delete-composer'>
      <h2 className='title-delete-composer-page'>Suppression </h2>
      <p className='description-delete-composer-page'>Etes-vous sûr(e) de vouloir supprimer ce compositeur ?</p>
      <div className='pack-btn-delete-page'>
        <button className='btn-delete-composer-page' onClick={handleDeleteComposer} disabled={isDeleting}>
          {isDeleting ? 'Suppression...' : 'Suppression'}
        </button>
      </div>
    </div>
  );

};

export default DeleteComposer;
