import RatingStars from '../../atoms/RatingStars/RatingStars';
import { useGoNavigate } from '../../../hooks/Navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import { courseService } from '../../../services/Courses/CourseService';
import "./CoursesList.scss";
import ButtonGroupList from '../../molecules/ButtonGroupList/ButtonGroupList';
import Pagination from '../../molecules/Pagination/Pagination';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = () => {

  const [datas,setDatas] = useState([]);
  const itemsPerPage = 6;
  const firstTenElements = datas.length > 0 ? datas.slice(0,itemsPerPage ) : [];
  const { navigateTo } = useGoNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [totalPages, setTotalPages] = useState(1);


  const handleAdd = () => {
    navigateTo(`/courses/add`);
  };

  const truncatedDatas = useCallback((dataElement :any) =>  {
    if( dataElement && dataElement.length > 0){
      const currentElemnt = dataElement && dataElement.slice(startIndex, endIndex);
      setCurrentPage(currentElemnt);
      const totalElement = Math.ceil(dataElement && dataElement.length / itemsPerPage);
      setTotalPages(totalElement)
    }
  },[endIndex,startIndex]);

  const handlePageChange = (newPage :any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    truncatedDatas(newPage);
  };

  useEffect(() => {
    
    if(localStorage.getItem("jwt") && localStorage.getItem("jwt") !== '') {
      const loadDatas = async () => {
        let datas = await courseService.courseAll();
        setDatas(datas);
        setTotalPages(Math.round(datas.length / itemsPerPage))
      };
      loadDatas();
    }
  },[]);

 return (
  <>
    <ButtonGroupList handleAdd={handleAdd} />
    <div className='container-list-courses card'>
      <table className='courses'>
        <thead>
          <tr>
            <th> </th>
            <th>Id</th>
            <th>Nom du cours</th>
            <th>Professeur</th>
            <th>Instruments</th>
            <th>Note</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {firstTenElements.map((value : any, index : any) => (
            <tr key={index} tabIndex={0} onClick={() => navigateTo(`/courses/${value.id}`)} >
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
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  </>


)};

export default CoursesList;