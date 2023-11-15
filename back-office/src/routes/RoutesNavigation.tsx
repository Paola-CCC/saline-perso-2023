import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { CourseAdd, CourseDelete, CourseEdit, CourseItem, CoursesList, Homepage, ListCategory, ListComposer, ListInstrument} from '../components/pages';




const RoutesNavigation = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="homepage" element={<Homepage />} />

        <Route path="courses" element={<CoursesList />} />
        <Route path="courses/:Id" element={<CourseItem />} />
        <Route path="courses/add" element={<CourseAdd />} />
        <Route path="courses/edit" element={<CourseEdit />} />
        <Route path="courses/delete" element={<CourseDelete />} />

        <Route path="instruments" element={<ListInstrument />} />
        <Route path="categories" element={<ListCategory />} />
        <Route path="composers" element={<ListComposer />} />
    </Routes>
  )
}

export default RoutesNavigation;

