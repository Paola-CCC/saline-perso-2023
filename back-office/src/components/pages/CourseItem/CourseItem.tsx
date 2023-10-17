import React, { FC } from 'react';
import './CourseItem.scss';
import { Outlet } from 'react-router-dom';
import ButtonGroupItem from '../../molecules/ButtonGroupItem/ButtonGroupItem';
import { useGoNavigate } from '../../../hooks/Navigation';

interface CourseItemProps {}

const CourseItem: FC<CourseItemProps> = () => {

  const { navigateTo } = useGoNavigate();

  const handleUpdate = () => {
    navigateTo(`/courses/edit`);
  };

  const handleDelete = () => {
    navigateTo(`/courses/delete`);
  };
  
  return (
  <>
    <ButtonGroupItem handleUpdate={handleUpdate} handleDelete={handleDelete} />
    ButtonGroupItem
    <Outlet />
  </>
)}; 

export default CourseItem;
