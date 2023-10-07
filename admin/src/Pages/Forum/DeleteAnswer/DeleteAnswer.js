import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DeleteAnswer.css';

const DeleteAnswer = () => {
    const { topicId, answerId } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
    setIsDeleting(true);
    axios.delete(process.env.REACT_APP_API_URL+`/response/${answerId}`)
        .then(response => {
        setIsDeleting(false);
        navigate(`/topics/${topicId}`);
        })
        .catch(error => {
        console.error('Error deleting answer', error);
        setIsDeleting(false);
        });
    };

    return (
    <div className='answers'>
        <h2 className='title-page-delete'>Suppression </h2>
        <p className='description-page'>Etes-vous sûr(e) de vouloir supprimer cette réponse ?</p>
        <div className='container-btn'>
            <button className='btn-delete-answer' onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Suppression...' : 'Suppression'}
            </button>
        </div>
    </div>
    );
};

export default DeleteAnswer;
