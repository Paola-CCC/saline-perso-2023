import RatingStars from '../../atoms/RatingStars/RatingStars';
import Button from '../../atoms/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useGoNavigate } from '../../../hooks/Navigation';
import { FC, useEffect, useState } from 'react';
import { courseService } from '../../../services/Courses/CourseService';
import "./CoursesList.scss";
import ButtonGroupList from '../../molecules/ButtonGroupList/ButtonGroupList';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = () => {

  const [datas,setDatas] = useState([]);
  const { navigateTo } = useGoNavigate();

  const handleAdd = () => {
    navigateTo(`/courses/add`);
  };

  useEffect(() => {
    
    if(localStorage.getItem("jwt") && localStorage.getItem("jwt") !== '') {
      const loadDatas = async () => {
        let datas = await courseService.courseAll();
        setDatas(datas);
      };
      loadDatas();
    }
  },[]);

 return (
  <>
    <ButtonGroupList handleAdd={handleAdd} />
    <div className='container-list-courses'>
      <table className='courses card'>
        <thead>
          <tr>
            <th> </th>
            <th>Id</th>
            <th>Nom du cours</th>
            <th>Professeur</th>
            <th>Instruments</th>
            <th>Note</th>
            <th>Date de création</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {datas.map((value : any, index : any) => (
            <tr key={index}>
              <td className='zone-img'>
              {value.photo && (
                <div className='img-courses'>
                    <img src={value.photo} alt={'86'} className="card-img" />
                </div>
              )}
              </td>
              <td className='txt'>{value.id}</td>
              <td className='txt'>{value.title}</td>
              <td className='txt'>{`${value.professor.firstName} ${value.professor.lastName}`}</td>
              <td className='txt'>{`${value.instrument.name}`}</td>
              <td className='txt'>
                <span className="stars-area">
                  <RatingStars ratingScore={value.ratingScore} />
                </span>          
              </td>
              <td className='txt'>{value.createdAt}</td>
              <td className='txt last'>
                <Button kind='secondary' onClick={() => navigateTo(`/courses/${value.id}`)}>
                  continuer
                  <FontAwesomeIcon icon={faArrowRight} style={{color: "#6c757d"}} />
                </Button>          
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>


)};

export default CoursesList;