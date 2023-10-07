import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCourse.css';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [preview, setPreview] = useState('');
  const [photo, setPhoto] = useState('');
  const [instrumentId, setInstrumentId] = useState('');
  const [availableInstruments, setAvailableInstruments] = useState([]);
  const [professorId, setProfessorId] = useState('');
  const [availableProfessors, setAvailableProfessors] = useState([]);
  const [composerId, setComposerId] = useState('');
  const [availableComposers, setAvailableComposers] = useState([]);
  const [categoryNames, setCategoryNames] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);


  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL+'/instruments')
      .then(response => {
        setAvailableInstruments(response.data);
      })
      .catch(error => {
        console.error('Error loading instruments:', error);
      });

    axios.get(process.env.REACT_APP_API_URL+'/composer')
      .then(response => {
        setAvailableComposers(response.data);
      })
      .catch(error => {
        console.error('Error loading composers:', error);
      });

      axios.get(process.env.REACT_APP_API_URL+'/users/professors')
      .then(response => {
        setAvailableProfessors(response.data);
      })
      .catch(error => {
        console.error('Error loading professors', error);
      });

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
      const newCourse = {
        title,
        description,
        price,
        linkVideo,
        preview,
        photo,
        instrument: { id: instrumentId },
        professor:{ id: professorId },
        composer: [{ id: composerId }],
        category: [{ name: categoryNames}],
      };
      console.log(newCourse);
      await axios.post(process.env.REACT_APP_API_URL+'/new-course', newCourse);
    } catch (error) {
      console.error('Error creating course', error);
    }
  };

  return (
    <div className='add-course'>
      <div className='cont-title-page'>
        <h1 className='title-page-add-course'>Ajouter un cours</h1>
      </div>
      <div className='cont-add-course'>
        <label><strong>Titre:</strong></label>
      <input className='input-add-course'  type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

      <label><strong>Description:</strong> </label>
      <input className='input-add-course' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

      <label><strong>Price:</strong></label>
      <input className='input-add-course'  type='text' value={price} onChange={(e) => setPrice(e.target.value)}/>

      <label><strong>LinkVideo:</strong></label>
      <input className='input-add-course'  type='text' value={linkVideo} onChange={(e) => setLinkVideo(e.target.value)} />

      <label><strong>Preview:</strong></label>
      <input className='input-add-course'  type='text' value={preview} onChange={(e) => setPreview(e.target.value)} />

      <label><strong>Photo:</strong></label>
      <input className='input-add-course'  type='text' value={photo} onChange={(e) => setPhoto(e.target.value)}/>

      <label><strong>Instrument:</strong></label>
      <select className='select-add-course' value={instrumentId} onChange={(e) => setInstrumentId(e.target.value)}>
        <option value=''>Sélectionner un instrument</option>
        {availableInstruments.map(instrument => (
          <option key={instrument.id} value={instrument.id}>{instrument.name}</option>
        ))}
      </select>

      <label>Professeur:</label>
      <select className='select-add-course' value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
        <option value=''>Sélectionner un professeur</option>
        {availableProfessors.map(professor => (
          <option key={professor.id} value={professor.id}>{professor.firstName} {professor.lastName}</option>
        ))}
      </select>

      <label>Compositeurs:</label> 
      <select className='select-add-course' value={composerId} onChange={(e) => setComposerId(e.target.value)}>
        <option value=''>Sélectionner un compositeur</option>
        {availableComposers.map(composer => (
          <option key={composer.id} value={composer.id}>{composer.fullName}</option>
        ))}
      </select>

      <label><strong>Catégories:</strong></label>
      <select className='select-add-course' value={categoryNames} onChange={(e) => setCategoryNames(e.target.value)}>
      <option value=''>Sélectionner une catégorie</option>
        {availableCategories.map(category => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
      </div>
      
      <div className='cont-add-course-check'>
        <button className='btn-add-coure-check' onClick={handleSubmit}>Ajouter le cours</button>
      </div>
      
    </div>
  );
};

export default AddCourse;
