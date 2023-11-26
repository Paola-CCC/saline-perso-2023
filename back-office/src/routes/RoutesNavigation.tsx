import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { CategoriesAdd, CategoriesList, ComposersAdd, ComposersEdit, ComposersItem, ComposersList, CourseAdd, CourseDelete, CourseEdit, CourseItem, CoursesList, Homepage, InstrumentAdd, InstrumentsList} from '../components/pages';
import ProfessorsList from '../components/pages/professors/ProfessorsList/ProfessorsList';
import ProfessorsAdd from '../components/pages/professors/ProfessorsAdd/ProfessorsAdd';

const RoutesNavigation = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="homepage" element={<Homepage />} />

        <Route path="courses" element={<CoursesList />} />
        <Route path="courses/add" element={<CourseAdd />} />
        <Route path="courses/:Id" element={<CourseItem />} />
        <Route path="courses/:Id/edit" element={<CourseEdit />} />

        <Route path="instruments" element={<InstrumentsList/>} />
        <Route path="instruments/add" element={< InstrumentAdd />} />

        <Route path="categories" element={<CategoriesList/>} />
        <Route path="categories/add" element={< CategoriesAdd />} />

        <Route path="composers" element={< ComposersList />} />
        <Route path="composers/add" element={< ComposersAdd />} />
        <Route path="composers/:Id" element={<ComposersItem />} />
        <Route path="composers/:Id/edit" element={<ComposersEdit />} />

        <Route path="professors" element={< ProfessorsList />} />
        <Route path="professors/add" element={< ProfessorsAdd />} />

    </Routes>
  )
}

export default RoutesNavigation;

