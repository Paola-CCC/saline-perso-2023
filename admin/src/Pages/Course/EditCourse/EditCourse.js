import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import InputFile from '../../../components/InputFile/InputFile';
import './EditCourse.css';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [instrumentId, setInstrumentId] = useState('');
  const [availableInstruments, setAvailableInstruments] = useState([]);
  const [professorId, setProfessorId] = useState('');
  const [availableProfessors, setAvailableProfessors] = useState([]);
  const [composerId, setComposerId] = useState('');
  const [availableComposers, setAvailableComposers] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [files, setFiles] = useState();
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + `/courses/${courseId}`)
      .then(response => {
        const courseData = response.data;
        setTitle(courseData.title);
        setDescription(courseData.description);
        setPrice(courseData.price);
        setLinkVideo(courseData.linkVideo);
        setPreview(courseData.preview);
        setImage(courseData?.image?.imageName);
        setInstrumentId(courseData.instrument);
        setProfessorId(courseData.professor);
        setComposerId(courseData.composers);
        setCategoryName(courseData.categories);

        if (courseData.categories && courseData.categories.length > 0) {
          setCategoryName(courseData.categories[0].name);
        } else {
          setCategoryName('');
        }

        if (courseData.composers && courseData.composers.length > 0) {
          setComposerId(courseData.composers[0].id);
        } else {
          setComposerId('');
        }

        if (courseData.instrument && courseData.instrument.name) {
          setInstrumentId(courseData.instrument.id);
        } else {
          setInstrumentId('');
        }

        if (courseData.professor && courseData.professor.firstName) {
          setProfessorId(courseData.professor.id);
        } else {
          setProfessorId('');
        }
      })
      .catch(error => {
        console.error('Error loading course', error);
      });

    axios.get(process.env.REACT_APP_API_URL + '/instruments')
      .then(response => {
        setAvailableInstruments(response.data);
      })
      .catch(error => {
        console.error('Error loading instruments', error);
      });

    axios.get(process.env.REACT_APP_API_URL + '/composer')
      .then(response => {
        setAvailableComposers(response.data);
      })
      .catch(error => {
        console.error('Error loading composers', error);
      });

    axios.get(process.env.REACT_APP_API_URL + '/users/professors')
      .then(response => {
        setAvailableProfessors(response.data);
      })
      .catch(error => {
        console.error('Error loading professors', error);
      });

    axios.get(process.env.REACT_APP_API_URL + '/category/all')
      .then(response => {
        setAvailableCategories(response.data);
      })
      .catch(error => {
        console.error('Error loading categories', error);
      });

    // axios.get(`${process.env.REACT_APP_API_URL}/course/${courseId}/fileupload/${}`)
    // axios.get(process.env.REACT_APP_API_URL + '/course/' + courseId + '/fileuploads')
    //   .then(response => {
    //     // setCourses(response.data);
    //     setFiles(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error loading courses refs', error);
    //   });
  }, [courseId]);

  const onFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.error("No file selected");
      return;
    }

    setSelectedFile(file);
  };

  const updatePicture = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', selectedFile, selectedFile.name);

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + `/uploadimage/new/course/${courseId}`, formData);
      if (response && response.data !== '' && response.data !== undefined) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async () => {
    try {
      const updatedCourse = {
        title,
        description,
        price,
        linkVideo,
        preview,
        instrument: { id: instrumentId },
        professor: { id: professorId },
        composer: [{ id: composerId }],
        category: [{ name: categoryName }],
      };
      await axios.put(process.env.REACT_APP_API_URL + `/courses/${courseId}`, updatedCourse);
      console.log('Course updated successfully');
      navigate('/courses');

    } catch (error) {
      console.error('Error updating course', error);
    }
  };

  return (
    <div className='container-edit-course-page'>
      <h1 className='title-edit-course-page'>Modifier le cours</h1>
      <div className='pack-container-edit-course'>
        <label><strong>Titre:</strong></label>
        <input className='input-edit-course-title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

        <label><strong>Description:</strong></label>
        <textarea className='input-edit-course-description' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />

        <label><strong>Preview:</strong></label>
        <input className='input-preview' type='text' value={preview} onChange={(e) => setPreview(e.target.value)} />

        <label><strong>Prix:</strong></label>
        <input className='input-edit-course-price' type='text' value={price} onChange={(e) => setPrice(e.target.value)} />

        <label><strong>LinkVideo:</strong></label>
        <input className='input-edit-course-link-video' type='text' value={linkVideo} onChange={(e) => setLinkVideo(e.target.value)} />

        <label><strong>Instrument:</strong></label>
        <select className='select-name-instrument' value={instrumentId} onChange={(e) => setInstrumentId(e.target.value)}>
          <option value=''>Sélectionner un instrument</option>
          {availableInstruments.map(instrument => (
            <option key={instrument.id} value={instrument.id}>{instrument.name}</option>
          ))}
        </select>

        <label><strong>Professeur:</strong></label>
        <select className='select-name-professor' value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
          <option value=''>Sélectionner un professeur</option>
          {availableProfessors.map(professor => (
            <option key={professor.id} value={professor.id}>
              {professor.firstName} {professor.lastName}
            </option>
          ))}
        </select>

        <label><strong>Compositeur:</strong></label>
        <select className='select-name-compositor' value={composerId} onChange={(e) => setComposerId(e.target.value)}>
          <option value=''>Sélectionner un compositeur</option>
          {availableComposers.map(composer => (
            <option key={composer.id} value={composer.id}>{composer.fullName}</option>
          ))}
        </select>

        <label><strong>Catégorie:</strong></label>
        <select className='select-name-category' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
          <option value=''>Sélectionner une catégorie</option>
          {availableCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>

        <label><strong>Photo:</strong></label>
        <div className="update-pic d-flex">
          <div className="btn-pic">
            <div className="mb-3" >
              <InputFile onFileChange={(e) => onFileChange(e)} />
            </div>
          </div>

          <div className="img-profile">
            <img
              src={image ? process.env.REACT_APP_API_URL + '/images/upload/' + image : process.env.REACT_APP_API_URL + '/images/upload/course.png'} alt='Photo de couverture'
            />
          </div>

          <button className='btn-edit-pic' onClick={updatePicture} >
            Modifier la photo
          </button>
        </div>

        <label><strong>Supports de cours:</strong></label>
        <div className="update-pic d-flex">
          <div className="btn-pic">
            <div className="mb-3" >
              <InputFile onFileChange={(e) => onFileChange(e)} />
            </div>
          </div>


          <button className='btn-edit-pic' onClick={updatePicture} >
            Modifier les supports
          </button>
        </div>

      </div>

      <button className='btn-edit-course' onClick={handleSubmit}>Enregistrer les modifications</button>
      <div className="files">
        <FileSection courseId={courseId} />
      </div>
    </div>
  );
};

const FileSection = ({ courseId }) => {
  const [courseID, setCourseID] = useState(courseId);
  const [files, setFiles] = useState();

  useEffect(() => {

    console.log(courseID)
    axios.get(process.env.REACT_APP_API_URL + '/course/' + courseID + '/fileuploads')
      .then(response => {
        // setCourses(response.data);
        setFiles(response.data);
      })
      .catch(error => {
        console.error('Error loading courses refs', error);
      });
  }, [courseID])

    ;

  const removeFile = (id) => {
    console.log(id);
    // try {
    axios.delete(`${process.env.REACT_APP_API_URL}/course/${courseId}/fileupload/${id}`)
      .then(response => {
        console.log('seeeeee here : ')
        console.log(response)
      })
      .catch(error => {
        console.error('Error deleting files', error);
      });

    // }
  }

  return (
    <ul>
      {files &&
        files.map((file, key) => (
          <li key={key}>
            <a href={`${process.env.REACT_APP_API_URL}/course/${courseID}/fileupload/${file.id}`}>
              {file.originalFilename}
            </a>
            <button onClick={() => removeFile(file.id)}>Delete</button>
            <a href={`${process.env.REACT_APP_API_URL}/course/${courseID}/fileupload/${file.id}`}>Add</a>
          </li>
        ))}
    </ul>
  )
};

export default EditCourse;