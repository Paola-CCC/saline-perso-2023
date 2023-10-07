import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContextProvider';
import './AddTopic.css';

const AddTopic = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [categoryNames, setCategoryNames] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);
  const { userId } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {

    axios.get(process.env.REACT_APP_API_URL+'/category/all')
      .then(response => {
        setAvailableCategories(response.data);
      })
      .catch(error => {
        console.error('Error loading categories', error);
      });
  }, []);
    const handleSubmit = async () => {
      try {
        const newForum = {
          subject,
          description,
          author: {id: userId},
          category: [{ name: categoryNames}],
        };
        await axios.post(process.env.REACT_APP_API_URL+'/new-forum', newForum);
        console.log('Forum added succeffully');
        navigate('/topics');
      } catch (error) {
        console.error('Error creating course', error);
      }
    };

  return (
    <div>
      <h1>Créer un forum</h1>
        <div className='cont-add-forum'>
          <label><strong>Intitulé:</strong></label>
          <input className='input-add-forum'  type='text' value={subject} onChange={(e) => setSubject(e.target.value)} />

          <label><strong>Description:</strong> </label>
          <input className='input-add-forum' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

          <label><strong>Catégorie:</strong></label>
            <select className='select-add-forum' value={categoryNames} onChange={(e) => setCategoryNames(e.target.value)}>
              <option value=''>Sélectionner une catégorie</option>
              {availableCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
             ))}
           </select>
        </div>
        <div className='cont-add-forum-check'>
          <button className='btn-add-forum-check' onClick={handleSubmit}>Ajouter le sujet</button>
        </div>
    </div>
  );
};

export default AddTopic;
