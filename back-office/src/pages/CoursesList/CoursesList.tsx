import React, { FC, useEffect, useState } from 'react';
import './CoursesList.scss';
import CardCourse from '../../components/molecules/CardCourse/CardCourse';
import { courseService } from '../../services/Courses/CourseService';


interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = () => {

  const [ datas ,setDatas ] = useState([]);

  useEffect(() => {
    
    const loadDatas = async () => {
      let datas = await courseService.courseAll();
      setDatas(datas);
    };
    
    loadDatas();

  },[])

  return (      
      <ul className='all-courses'>
        {datas.map((value, index) => (
          <li key={index} >
            <CardCourse
              id={value.id}
              imgSrc={value.photo}
              imgAlt="Cours de Violon"
              title={value.title}
              rating={value.ratingScore}
              shortDescription={value.preview}
              longDescription={value.description}
              professorName={ `${value.professor.firstName} ${value.professor.lastName}`}
              />
          </li>
        ))}
        </ul>
  );

}

export default CoursesList;
