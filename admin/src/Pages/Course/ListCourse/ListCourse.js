import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListCourse.css';
import Spinner from '../../../components/Spinner/Spinner';


const ListCourse = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/courses')
      .then(response => {
        // console.log(response);
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading courses', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='container-list-courses'>
      <div className='header-list-course'>
        <h1 className='title-page'>Liste des cours</h1>
        <div>
          <Link to="/add-course">
            <button className='btn-add-course'>Ajouter un cours</button>
          </Link>
        </div></div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <ul>
            {courses.map(course => (
              <li className='li-list-course' key={course.id}>
                <h2 className='text-start'>{course.title}</h2>
                <p className='description-course'><strong>Description: </strong> {course.description}</p>
                <p className='profesor-name'><strong>Enseignant : </strong> {`${course.professor.firstName} ${course.professor.lastName}`}</p>
                <p className='text-start'><strong>Prix:</strong> {course.price}</p>
                <p className='text-start'><strong>Note:</strong> {course.ratingScore}</p>
                <p className='text-start'><strong>Users:</strong></p>
                {course.users.length > 0 ?
                  (<ul className='user-course-firstname-lastname'>
                    {course.users.map((user, index) => (
                      <li className='li-course-user' key={index}>
                        {user.firstName} {user.lastName}
                      </li>
                    ))}
                  </ul>
                  ) : (
                    <p className='text-start'>Aucun utilisateur</p>
                  )
                }
                <div className='btn-course-list'>
                  {course.quizz ? (
                    <Link to={`/courses/${course.id}/delete-quizz`}>
                      <button className='btn-delete-quizz'>Supprimer le quizz</button>
                    </Link>
                  ) : (
                    <Link to={`/courses/${course.id}/new-quizz`}>
                      <button className='btn-add-quizz'>Ajouter un quizz</button>
                    </Link>
                  )}
                  <Link to={`/edit-course/${course.id}`}>
                    <button className='btn-edit-course'>Edition</button>
                  </Link>
                  <Link to={`/courses/${course.id}/new-file`}>
                    <button className='btn-files'>Gestion de fichiers</button>
                  </Link>
                  <Link to={`/delete-course/${course.id}`}>
                    <button className='btn-delete-course' >Supprimer le cours</button>
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

export default ListCourse;
