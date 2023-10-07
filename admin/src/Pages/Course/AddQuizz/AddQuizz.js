import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddQuizz.css';

const AddQuizz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{content: '', suggests: [] }]);
  const [isSubmissionSuccessfull, setSubmissionSuccessfull] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index].content = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSuggestChange = (event, questionIndex, suggestIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].suggests[suggestIndex].content = event.target.value;
    setQuestions(newQuestions);
  };

  const setCorrectAnswer = (questionIndex, suggestIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].suggests.forEach((suggest, index) => {
      suggest.response_expected = index === suggestIndex;
    });
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { content: '', suggests: [] }]);
  };

  const addSuggest = (questionIndex) => {
    if (!questions[questionIndex].suggests || questions[questionIndex].suggests.length < 3) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].suggests = [
        ...(newQuestions[questionIndex].suggests || []),
        { content: '', response_expected: false },
      ];
      setQuestions(newQuestions);
    }
  };

  const validateQuestionsQuizz = () => {
    for (const question of questions) {
      let selectedResponse = false;

      for (const suggest of question.suggests) {
        if (suggest.response_expected) {
          selectedResponse = true;
          break;
        }
      }

      if (!selectedResponse) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {

    if (!validateQuestionsQuizz()) {
      setErrorMessage('Veuillez sélectionner pour chaque question, la bonne réponse attendue.');
      return;
    }

    try {
      const newQuizz = { title, questions };
      await axios.post(process.env.REACT_APP_API_URL+`/courses/${courseId}/new-quizz`, newQuizz);
      setSubmissionSuccessfull(true);
      setSuccessMessage('Quizz ajouté avec succès');
      navigate('/courses');
      console.log('Quizz added successfully');
    } catch (error) {
      console.error('Error adding quizz', error);
    }
  };

  return (
    <div className='contaire-add-quizz'>
      <h1 className='title-page-add-quizz'>Ajouter un quizz</h1>
      <div className='container-form-title'>
        <label><strong>Titre du quizz:</strong></label>
        <input className='input-title-quizz' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      
      {questions.map((question, questionIndex) => (
        <div className='container-add-question' key={questionIndex}>
          <label><strong>Question:</strong></label>
          <input className='input-question-quizz'
            type="text"
            value={question.content}
            onChange={(e) => handleQuestionChange(e, questionIndex)}
          />

          {question.suggests && question.suggests.map((suggest, suggestIndex) => (
            <div className='container-proposition-question' key={suggestIndex}>
              <label>
                <strong>
                  Proposition {suggestIndex + 1}:
                </strong>
              </label>
              <input
                className='input-suggest-quizz'
                type="text"
                value={suggest.content}
                onChange={(e) => handleSuggestChange(e, questionIndex, suggestIndex)}
              />
              <label>
                La bonne réponse:
                <input 
                  type="radio"
                  checked={suggest.response_expected}
                  onChange={() => setCorrectAnswer(questionIndex, suggestIndex)}
                />
              </label>
            </div>
          ))}

          <button className='btn-add-suggest' onClick={() => addSuggest(questionIndex)}>Ajouter une suggestion</button>
        </div>
      ))}
      <div className='container-btn-quizz'>
        <button className='btn-add-question' onClick={addQuestion}>Ajouter une question</button>
        <button className='btn-valid-quizz' onClick={handleSubmit}>Valider le quizz</button>
        
        {errorMessage && (
          <p className="error-message">
            {errorMessage}
          </p> 
        )}

        {isSubmissionSuccessfull && (
          <p className="success-message">
            {successMessage} 
          </p>
        )}
      </div>
    </div>
  );
};

export default AddQuizz;
