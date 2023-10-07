import React, { useState } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from 'react-router-dom';
import './DeleteCourse.css';

const DeleteCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCourse = () => {
    setIsDeleting(true);
    axios.delete(process.env.REACT_APP_API_URL+`/courses/${courseId}`)
      .then(response => {
        setIsDeleting(false);
        navigate("/courses");
        console.log('Deleting successfully');
      })
      .catch(error => {
        console.error('Error deleting course', error);
        setIsDeleting(false);
      });
  };
  return (
    <div className='container-delete-course'>
      <h2 className='title-page-delete-course'>Suppression </h2>
      <p className='description-delete-course'>Etes-vous sûr(e) de vouloir supprimer ce cours ?</p>
      <div className='container-btn'>
        <button className='btn-delete-course' onClick={handleDeleteCourse} disabled={isDeleting}>
        {isDeleting ? 'Suppression...' : 'Suppression'}
      </button>
      </div>
      
    </div>
  );

};

export default DeleteCourse;
