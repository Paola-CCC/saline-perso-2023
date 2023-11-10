import React, { FC, useEffect, useState } from 'react';
import './CourseItem.scss';
import { useParams } from 'react-router-dom';
import ButtonGroupItem from '../../molecules/ButtonGroupItem/ButtonGroupItem';
import { useGoNavigate } from '../../../hooks/Navigation';
import { courseService } from '../../../services/Courses/CourseService';

interface CourseItemProps {}

interface IUser {
  id?: number,
  firstName?: string,
  lastName?: string,
  createdAt?: string,
  biography?: string
}

interface IComposers {
  id?: number,
  fullName?: string
}

interface ICategories {
  id?: number,
  name?: string
}

interface IInstrument {
  id? : number,
  name?: string,
  level?: number[]
}

interface IComments {
  id? : number,
  content?: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  user?: IUser[]
}

interface ICourseDataState {
  id?: number,
  title?: string,
  description?: string,
  price?: number,
  ratingScore?: number,
  linkVideo?: string,
  users?: IUser[],
  professor?: IUser[],
  composers?: IComposers[],
  categories?: ICategories[],
  instrument?: IInstrument,
  comments?:  IComments[],
  preview?: string,
  photo?: string,
  createdAt?: string,
  updatedAt?: string,
  ratings?:[]

}


const CourseItem: FC<CourseItemProps> = () => {

  const { navigateTo } = useGoNavigate();
  const { Id } = useParams();
  const [ courseData, setCourseData] = useState<ICourseDataState>({} as ICourseDataState);


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
      <div>
        <img src={courseData.photo} alt="" className="card-img" />
      </div>
    </div>
  </>
)}; 

export default CourseItem;
