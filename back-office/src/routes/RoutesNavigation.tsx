import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { CourseAdd, CourseDelete, CourseEdit, CourseItem, CoursesList, Homepage, ListCategory, ListComposer, ListInstrument, Login, Register } from '../pages';




const RoutesNavigation = () => {
  return (
    <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="courses" element={<CoursesList />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />



        <Route path="courses/:id" element={<CourseItem />} >
            <Route path="add" element={<CourseAdd />} />
            <Route path="edit" element={<CourseEdit />} />
            <Route path="delete" element={<CourseDelete />} />
        </Route>


        <Route path="instruments" element={<ListInstrument />} />
        <Route path="categories" element={<ListCategory />} />
        <Route path="composers" element={<ListComposer />} />
    </Routes>
  )
}

export default RoutesNavigation;

