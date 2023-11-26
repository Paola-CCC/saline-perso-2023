import React, { FC, useRef, useState } from 'react';
import './ProfessorsAdd.scss';
import InputText from '../../../atoms/InputText/InputText';
import Button from '../../../atoms/Button/Button';
import { useGoNavigate } from '../../../../hooks/Navigation';
import { usersService } from '../../../../services/Users/UsersService';

interface ProfessorsAddProps {}

const ProfessorsAdd: FC<ProfessorsAddProps> = () =>{ 

  const initialStateNewUsers = {
    firstname: '',
    lastname:'',
    email:'',
    biography: '',
    instrumentId: ''
  };

  const [ usersCreationIsSuccesful, setUsersCreationIsSuccesful] = useState< boolean | null > (null);
  const dataFetchedRef = useRef(false);
  const { navigateTo } = useGoNavigate();
  const [newUsers, setNewUsers] = useState(initialStateNewUsers);
  
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setNewUsers({ ...newUsers, [name]: value });
  };

  const clearNewCourse = () => {
    setUsersCreationIsSuccesful(null);
    setNewUsers(initialStateNewUsers);
  };

  const handleAdd = () => {
    clearNewCourse();
    navigateTo(`/courses`);
  };

  const handleSubmit = async () => {
    let response ;

    try {

        response = await usersService.register(newUsers);

        console.log('response ', response )

      // if( typeForm === 'creat') {
      //   response = await courseService.courseAdd(newCourse);
      // }

      // if( typeForm === 'edit') {
      //   response = await courseService.courseEdit(Id,newCourse);
      // }

      // if ( response && response.status >= 200 ){
      //   setCourseCreationIsSuccesful(true);
      // }
    
    } catch (error) {
      console.error('Error creating course', error);
    }
  };


  return (
    <div className='container-global-add'>
      <form className="add-course form">
        <div className='cont-title-page'>
          <h2 className='title-page-add-course'> Ajouter un professeur </h2> 
        </div>

        <div className="mb-3">
          <InputText
            label={"Prénom"}
            name='firstname'
            onChange={handleChange}
            value={newUsers?.firstname || ''}
            isRequired={true}
            errorText={""}
          />
        </div>

        <div className="mb-3">
          <InputText
            label={"Nom"}
            name='lastname'
            onChange={handleChange}
            value={newUsers?.lastname || ''}
            isRequired={true}
            errorText={""}
          />
        </div>

        <div className="mb-3">
          <InputText
            label={"Email"}
            name='email'
            onChange={handleChange}
            value={newUsers?.email || ''}
            isRequired={true}
            errorText={""}
          />
        </div>

        <div className="mb-3">
          <InputText 
            label= {"Biographie"}
            type="textarea"     
            name='biography' 
            onChange={handleChange}
            value={newUsers?.biography || ''}
            isRequired= {true}
            errorText={""}
          />
        </div>

        <div className='cont-add-course-check'>
          <Button kind='secondary' onClick={handleAdd}>
            Retour
          </Button> 
            <br></br>
          <Button kind='primary' onClick={handleSubmit}>
            <span> Créer</span> 
          </Button>
        </div>
        
      </form>
    </div>
)};

export default ProfessorsAdd;
