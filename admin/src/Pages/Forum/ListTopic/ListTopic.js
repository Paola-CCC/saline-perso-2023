import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListTopic.css';

const ListTopic = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axios.get(process.env.REACT_APP_API_URL+'/forums')
        .then(response => {
          setTopics(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading topics', error);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <div className='topic'>
        <div className='topic-header-list'>
          <h1 className="title-pages">Liste des sujets</h1>
           <div className='add-topic-list'>
              <Link className='a-list-topic-btn' to="/add-topic">
                <button className='add-btn-list'>Ajouter un sujet</button>
              </Link>
            </div>
        </div>
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
            <div>
              <ul className="ul-list-topic">
                {topics.map(topic => {
                  return (
                    <li className="li-list-topic" key={topic.id}>
                      <p><strong>Sujet: </strong>{topic.subject}</p>
                      <p><strong>Date de création:</strong> {topic.createdAt}</p>
                      <p><strong>Auteur:</strong> {topic.author.firstName} {topic.author.lastName}</p>
                      <div className='btn-list-topic'>
                        <Link className='a-list-topic-btn' to={`/delete-topic/${topic.id}`}>
                          <button className='delete-btn-list'>Suppression</button>
                        </Link>
                        <Link className='a-list-topic-btn' to={`/topics/${topic.id}`}>
                          <button className='edit-btn-list'>En savoir plus</button>
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
}

export default ListTopic;
