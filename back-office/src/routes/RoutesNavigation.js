import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CourseItem from '../pages/CourseItem/CourseItem';
import CoursesList from '../pages/CoursesList/CoursesList';
import Homepage from '../pages/Homepage/Homepage';

const RoutesNavigation = () => {
  return (
    <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="courses" element={<CoursesList />} />
        <Route path="courses/:id" element={<CourseItem />} />
    </Routes>
  )
}

export default RoutesNavigation;
