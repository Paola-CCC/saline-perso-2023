import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';
import './DeleteQuizz.css';

const DeleteQuizz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [quizzId, setQuizzId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+`/quizzes/course/${courseId}`)
      .then(response => {
        const quizzData = response.data;
        setQuizzId(quizzData[0].id);
      })
      .catch(error => {
        console.error('Error loading course', error);
      });
  }, []);

  const handleDeleteQuizz = () => {
    setIsDeleting(true);
    axios.delete(process.env.REACT_APP_API_URL+`/quizzes/${quizzId}`)
      .then(response => {
        console.log('Deleting successfully');
        setIsDeleting(false);
        navigate("/courses");
      })
      .catch(error => {
        console.error('Error deleting quizz', error);
        setIsDeleting(false);
      });
  };

  return (
    <div className='container-delete-quizz'>
      <h2 className='title-page-delete-quizz'>Suppression </h2>
      <p className='description-delete-quizz'>Etes-vous sûr(e) de vouloir supprimer le quizz de ce cours ?</p>
      <div className='container-btn'>
        <button className='btn-delete-quizz' onClick={handleDeleteQuizz} disabled={isDeleting}>
         {isDeleting ? 'Suppression...' : 'Suppression'}
        </button>
      </div>   
    </div>
  );
};

export default DeleteQuizz;

