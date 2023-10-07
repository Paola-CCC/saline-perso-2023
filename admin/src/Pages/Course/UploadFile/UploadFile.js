import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { convertBase64 } from '../../../utils/convertBase64';
import FileSection from '../../../components/FileSection/FileSection';
import "./UploadFile.css";
import Spinner from '../../../components/Spinner/Spinner';

const UploadFile = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [filename, setFilename] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [base64, setBase64] = useState('');
    const [isSubmissionSuccessfull, setSubmissionSuccessfull] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState([]);

    const uploadFile = async (e) => {

        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        const formatBase = base64.replace('data:application/pdf;base64,', '');
        setFilename(e.target.files[0].name);
        setSelectedFile(file);
        setBase64(formatBase);
    }

    const removeFile = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/course/${courseId}/fileupload/${id}`)
            .then(response => {

                setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
            })
            .catch(error => {
                console.error('Error deleting files', error);
            });
    }

    const handleSubmit = async () => {
        try {
            if (base64) {

                await axios.post(process.env.REACT_APP_API_URL + `/course/${courseId}/fileupload`, {
                    filename: filename,
                    data: base64
                }).then(response => {
                    setFiles((prevFiles) => [...prevFiles, response.data]);
                    setSelectedFile(null);
                    setFilename('');
                })
                setSubmissionSuccessfull(true);
                setSuccessMessage('Fichier ajouté avec succès');
            }
        } catch (error) {
            console.error('Error adding file', error);
        }
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/course/' + courseId + '/fileuploads')
            .then(response => {
                setFiles(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error loading courses refs', error);
            });
    }, [courseId]);

    return (
        <div>
            <h1 className='title text-center'>Gérer les supports du cours</h1>

            {errorMessage && (
                <div className="error-msg-box">
                    <p className="error-message">
                        {errorMessage}
                    </p>
                </div>
            )}

            <div className={`alert-msg-box ${isSubmissionSuccessfull ? 'show' : ''}`} onClick={() => setSubmissionSuccessfull(false)}>
                <p className="success-message">
                    {successMessage}
                </p>
            </div>


            <div className='container-add-question'>
                <div className="file-input-container flex">
                    <input type="file" id="file-input" className="hidden" onChange={(e) => uploadFile(e)} />
                    <label htmlFor="file-input" className="file-label">Choisir un Fichier</label>
                    <span className="selected-file m-left-3">{filename ? filename : 'Aucun fichier choisi'}</span>
                </div>
            </div>

            <div className='container-btn-quizz m-top'>
                <button className={`${selectedFile ? 'btn-upload' : 'disabled-button'}`} onClick={handleSubmit} disabled={!selectedFile} >Téléverser</button>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <FileSection courseId={courseId} files={files} removeFile={removeFile} />
            )}

            <button onClick={() => navigate('/courses')} className='float btn-back'>Retour</button>
        </div >
    );
};


export default UploadFile;



