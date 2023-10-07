import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './TopicById.css';

const TopicById = () => {
    const {topicId} = useParams();
    const [topicData, setTopicData] = useState({});
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axios.get(process.env.REACT_APP_API_URL+`/forums/${topicId}`)
        .then(response => {
          setTopicData(response.data);
          setAnswers(response.data.responses);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading topic details', error);
          setIsLoading(false);
        });
    }, [topicId]);
  
    return (
      <div className='topic'>
        <div className='topic-header-list'>
          <h1 className="title-pages">Détail des échanges : </h1>
        </div>
        {isLoading ? (
          <p>Chargement...</p>
          ) : (
          <div>
              <ul className="ul-list-topic">
                <p><strong>Sujet: </strong>{topicData.subject}</p>
                <div>
                  <Link className='a-list-topic-btn' to={`/delete-topic/${topicData.id}`}>
                    <button className='btn-delete-topic'>Suppression</button>
                  </Link>
                </div>
                {topicData.responses && topicData.responses.length > 0 ? (
                  answers.map(answer => {
                    return (
                      <li className="li-list-topics" key={answer.id}>
                        <p><strong> " {answer.author.firstName} {answer.author.lastName} "</strong> a répondu: </p>
                        <p><strong> " {answer.content} "</strong> </p>
                        <p><strong> Le :</strong> {answer.createdAt}</p>
                        <div>
                          <Link className='a-list-topic-btn' to={`/topics/${topicId}/delete-answer/${answer.id}`}>
                            <button className='delete-btn-list'>Suppression</button>
                          </Link>
                        </div>
                      </li>
                    );
                  })
                  ) : (
                    <p><strong>Aucune réponse pour ce sujet.</strong></p>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    );
}

export default TopicById;
