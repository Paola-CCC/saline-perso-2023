import React, { FC, useEffect, useState } from 'react';
import './CourseItem.scss';
import { useParams } from 'react-router-dom';
import ButtonGroupItem from '../../molecules/ButtonGroupItem/ButtonGroupItem';
import { useGoNavigate } from '../../../hooks/Navigation';
import { courseService } from '../../../services/Courses/CourseService';
import Button from '../../atoms/Button/Button';
import RatingStars from '../../atoms/RatingStars/RatingStars';

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
  professor?: IUser,
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

  const initialState: ICourseDataState = {
    id: undefined,
    title: '',
    description: '',
    price: undefined,
    ratingScore: 0,
    linkVideo: '',
    users: [],
    professor: {},
    composers: [],
    categories: [],
    instrument: {},
    comments: [],
    preview: '',
    photo: '',
    createdAt: '',
    updatedAt: '',
    ratings: []
  };

  const { navigateTo } = useGoNavigate();
  const { Id } = useParams();
  const [ courseData, setCourseData] = useState<ICourseDataState>(initialState);
  const [ canShowVideo, setCanShowVideo] = useState< boolean>(false);


  const handleUpdate = () => {
    navigateTo(`/courses/edit`);
  };
  const [embedId , setEmbedId] = useState< string |undefined>(undefined);

  const handleDelete = () => {
    navigateTo(`/courses/delete`);
  };

  useEffect(() => {

    if(Id && Id !== '') {
      const loadDatas = async () => {
        let datas = await courseService.courseShow(Id);
        setCourseData(datas);
        setEmbedId(datas?.linkVideo);
      };
      loadDatas();
    }

  },[Id, embedId]);

  return (
  <>
    <ButtonGroupItem handleUpdate={handleUpdate} handleDelete={handleDelete} />
    <div className='container-item-course'>
      <div className='zone-media'>

        { canShowVideo && (
          <div className='media video'>
              <iframe
                // width="560"
                // height="315"
                className="responsive-iframe"
                src={`https://www.youtube.com/embed/${embedId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
          </div>
        )}

        { !canShowVideo && (
          <div className='media img'>
              <img src={courseData?.photo} alt="" className="card-img" />
          </div>
        )}

        <div className='course-heading'>
          <div className='zone-btn'>
              <Button kind='primary' onClick={() => setCanShowVideo(false)}>
                Photo
              </Button>
              <Button kind='primary' onClick={() => setCanShowVideo(true)}>
                Voir la vidéo
              </Button>
          </div>
          <div className='zone-text title'>
              <h3> {courseData?.title} </h3>
              <div>
                <p> {courseData?.createdAt}</p>
              </div>
          </div>

          <div className="infos-professors-area">
                <div className="photos-area">
                  <img
                    className="fit-picture"
                    src={"https://media.vanityfair.fr/photos/639f79ac2538fa0aa80eee71/16:9/w_2240,c_limit/1174331336"}
                    alt=""
                  />
                </div>

                <div className="infos-course-area">
                  <h3> {(courseData?.professor?.firstName && courseData?.professor?.lastName  ) ? (courseData?.professor?.firstName + ' '+ courseData?.professor?.lastName) : '' } </h3>
                  <div className="text-area">
                    <p> 
                      <span className="stars-area">
                          avis:  <RatingStars ratingScore={courseData?.ratingScore !== undefined  ?  courseData?.ratingScore    :  0   } />
                      </span>  
                    </p>
                    <p> {courseData?.price  + ' €'}</p>
                  </div>
                </div>
                </div>
        </div>
      </div>

      <div className='zone-datas'>
          <div className='informations'> 
            <p> {courseData?.description} </p>
          </div>
      </div>
    </div>
  </>
)}; 

export default CourseItem;
