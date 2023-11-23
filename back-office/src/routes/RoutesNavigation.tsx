import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { CategoriesAdd, CategoriesList, ComposersAdd, ComposersList, CourseAdd, CourseDelete, CourseEdit, CourseItem, CoursesList, Homepage, InstrumentAdd, InstrumentsList} from '../components/pages';

const RoutesNavigation = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="homepage" element={<Homepage />} />

        <Route path="courses" element={<CoursesList />} />
        <Route path="courses/:Id" element={<CourseItem />} />
        <Route path="courses/add" element={<CourseAdd />} />
        <Route path="courses/:Id/edit" element={<CourseEdit />} />
        <Route path="courses/:Id/delete" element={<CourseDelete />} />

        <Route path="instruments" element={<InstrumentsList/>} />
        <Route path="instruments/add" element={< InstrumentAdd />} />

        <Route path="categories" element={<CategoriesList/>} />
        <Route path="categories/add" element={< CategoriesAdd />} />

        <Route path="composers" element={< ComposersList />} />
        <Route path="composers/add" element={< ComposersAdd />} />

    </Routes>
  )
}

export default RoutesNavigation;

