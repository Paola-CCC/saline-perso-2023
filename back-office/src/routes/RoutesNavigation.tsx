import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { CategoriesAdd, CategoriesList, ComposersAdd, ComposersEdit, ComposersItem, ComposersList, CourseAdd, CourseEdit, CourseItem, CoursesList, Homepage, InstrumentAdd, InstrumentsList, ProfessorsAdd, ProfessorsEdit, ProfessorsList} from '../components/pages';
import ProfessorsItem from '../components/pages/professors/ProfessorsItem/ProfessorsItem';
import StudentsList from '../components/pages/students/StudentsList/StudentsList';
import EntrepriseList from '../components/pages/entreprise/EntrepriseList/EntrepriseList';
import EntrepriseAdd from '../components/pages/entreprise/EntrepriseAdd/EntrepriseAdd';


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
        <Route path="professors/:Id" element={<ProfessorsItem />} />
        <Route path="professors/:Id/edit" element={<ProfessorsEdit />} />


        <Route path="students" element={< StudentsList />} />
        {/* <Route path="professors/add" element={< ProfessorsAdd />} />
        <Route path="professors/:Id" element={<ProfessorsItem />} />
        <Route path="professors/:Id/edit" element={<ProfessorsEdit />} /> */}


        <Route path="entreprise" element={< EntrepriseList />} />
        <Route path="entreprise/add" element={< EntrepriseAdd />} />
        <Route path="entreprise/:Id/edit" element={<ProfessorsEdit />} />


    </Routes>
  )
}

export default RoutesNavigation;

