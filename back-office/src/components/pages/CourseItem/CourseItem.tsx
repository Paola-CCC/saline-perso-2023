import React, { FC, useEffect, useState } from 'react';
import './CourseItem.scss';
import { useParams } from 'react-router-dom';
import ButtonGroupItem from '../../molecules/ButtonGroupItem/ButtonGroupItem';
import { useGoNavigate } from '../../../hooks/Navigation';
import { courseService } from '../../../services/Courses/CourseService';

interface CourseItemProps {}

interface User {
  id : number,
  firstName: string,
  lastName: string,
  createdAt: string,
  biography: string
}

interface Composers {
  id : number,
  fullName: string
}

interface Categories {
  id : number,
  name: string
}

interface Instrument {
  id : number,
  name: string,
  level: [number]
}

interface Comments {
  id : number,
  content: string,
  createdAt: string | null,
  updatedAt: string | null,
  user: User[]
}

interface courseDataState {
  id: number,
  title: string,
  description: string,
  price: number,
  ratingScore: number,
  linkVideo: string,
  users?: User[],
  professor?: User[],
  composers?: Composers[],
  categories?: Categories[],
  instrument: Instrument,
  comments:  Comments[],
  preview: string | null,
  photo?: string | null,
  createdAt: string | null,
  updatedAt: string | null,
  ratings?:[]

}


const CourseItem: FC<CourseItemProps> = () => {

  const { navigateTo } = useGoNavigate();
  const { Id } = useParams();
  const [ courseData, setCourseData] = useState<courseDataState | {}>({});


  const handleUpdate = () => {
    navigateTo(`/courses/edit`);
  };

  const handleDelete = () => {
    navigateTo(`/courses/delete`);
  };

  useEffect(() => {

    if(Id && Id !== '' && Object.values(courseData).length === 0) {
      const loadDatas = async () => {
        let datas = await courseService.courseShow(Id);
        setCourseData(datas);
        console.log("datas ",datas)
      };
      loadDatas();
    }

  },[Id ,courseData]);

  return (
  <>
    <ButtonGroupItem handleUpdate={handleUpdate} handleDelete={handleDelete} />
    ButtonGroupItem

    <div className='container-item-course'>
      
    </div>
  </>
)}; 

export default CourseItem;
