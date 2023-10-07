import React, { useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';
import './DeleteTopic.css';

const DeleteTopic = () => {
    const { topicId } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
  
    const handleDelete = () => {
      setIsDeleting(true);
      axios.delete(process.env.REACT_APP_API_URL+`/forums/${topicId}`)
        .then(response => {
          setIsDeleting(false);
          navigate('/topics');
        })
        .catch(error => {
          console.error('Error deleting topic', error);
          setIsDeleting(false);
        });
    };
  
    return (
      <div className='topic'>
        <h2 className='title-page-delete-topic'>Suppression </h2>
        <p className='description-delete-topic'>Etes-vous sûr(e) de vouloir supprimer ce sujet ?</p>
        <div className='container-btn'>
          <button className='btn-delete-topic' onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Suppression...' : 'Suppression'}
          </button>
        </div>
      </div>
    );
  };
export default DeleteTopic;
