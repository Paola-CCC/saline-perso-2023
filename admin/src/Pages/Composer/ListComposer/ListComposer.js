import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListComposer.css';

const ListComposer = () => {
  const [composers, setComposers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'/composer')
      .then(response => {
        setComposers(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading composers', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='container-list-composer'>
      <div className='header-list-composer'>
      <h1 className='title-page-list-composer'>Liste des compositeurs</h1>
      <Link to="/add-composer">
              <button className='btn-add-composer'>Ajouter un compositeur</button>
            </Link>
      </div>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          <ul>
            {composers.map(composer => (
              <li className='li-list-composer' key={composer.id}>
                <h2 className='title-composer'>{composer.fullName}</h2>
                <p className='description-composer'><strong>Biographie :</strong> {composer.biography}</p>
                <h3 className='description-composer'><strong>Cours associés :</strong></h3>
                <ul className='course-id-course-title'>
                  {composer.courses.map(course => (
                    <li key={course.id}>{course.title}</li>
                  ))}
                </ul>
                <div className='container-btn-list-composer'>
                  <Link to={`/delete-composer/${composer.id}`}>
                    <button className='btn-delete-composer'>Supprimer</button>
                  </Link>
                  <Link to={`/edit-composer/${composer.id}`}>
                    <button className='btn-edit-composer'>Mettre à jour</button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListComposer;
