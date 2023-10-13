import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccessDenied from '../../components/AccessDenied/AccessDenied';
import Login from '../../components/Login/Login';
import ListCourse from '../../Pages/Course/ListCourse/ListCourse';
import ListComposer from '../../Pages/Composer/ListComposer/ListComposer';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import ListInstrument from '../../Pages/Instrument/ListInstrument/ListInstrument';
import DeleteInstrument from '../../Pages/Instrument/DeleteInstrument/DeleteInstrument';
import EditInstrument from '../../Pages/Instrument/EditInstrument/EditInstrument';
import AddInstrument from '../../Pages/Instrument/AddInstrument/AddInstrument';
import UploadFile from '../../Pages/Course/UploadFile/UploadFile';
import EditComposer from '../../Pages/Composer/EditComposer/EditComposer';
import EditCourse from '../../Pages/Course/EditCourse/EditCourse';
import AddCourse from '../../Pages/Course/AddCourse/AddCourse';
import DeleteCourse from '../../Pages/Course/DeleteCourse/DeleteCourse';
import AddQuizz from '../../Pages/Course/AddQuizz/AddQuizz';
import DeleteQuizz from '../../Pages/Course/DeleteQuizz/DeleteQuizz';
import AddComposer from '../../Pages/Composer/AddComposer/AddComposer';
import DeleteComposer from '../../Pages/Composer/DeleteComposer/DeleteComposer';
import ListTopic from '../../Pages/Forum/ListTopic/ListTopic';
import AddTopic from '../../Pages/Forum/AddTopic/AddTopic';
import DeleteTopic from '../../Pages/Forum/DeleteTopic/DeleteTopic';
import TopicById from '../../Pages/Forum/TopicById/TopicById';
import DeleteAnswer from '../../Pages/Forum/DeleteAnswer/DeleteAnswer';
import ListCategory from '../../Pages/Category/ListCategory/ListCategory';
import DeleteCategory from '../../Pages/Category/DeleteCategory/DeleteCategory';
import AddCategory from '../../Pages/Category/AddCategory/AddCategory';
import EditCategory from '../../Pages/Category/EditCategory/EditCategory';

const Main = () => {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route index path="/login" element={<Login />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      <Route element={<PrivateRoute />} >
        <Route index path="/" element={<ListCourse />} />
        <Route path="/courses" element={<ListCourse />} />
        <Route path="/composers" element={<ListComposer />} />

        <Route path="/add-instrument" element={<AddInstrument />} />
        <Route path="/edit-instrument/:instrumentId" element={<EditInstrument />} />
        <Route path="/delete-instrument/:instrumentId" element={<DeleteInstrument />} />
        <Route path="/instruments" element={<ListInstrument />} />

        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:courseId" element={<EditCourse />} />
        <Route path="/delete-course/:courseId" element={<DeleteCourse />} />

        <Route path="/courses/:courseId/new-quizz" element={<AddQuizz />} />
        <Route path="/courses/:courseId/delete-quizz" element={<DeleteQuizz />} />
        <Route path="/courses/:courseId/new-file" element={<UploadFile />} />

        <Route path="/add-composer" element={<AddComposer />} />
        <Route path="/edit-composer/:composerId" element={<EditComposer />} />
        <Route path="/delete-composer/:composerId" element={<DeleteComposer />} />

        <Route path="/topics" element={<ListTopic />} />
        <Route path="/add-topic" element={<AddTopic />} />
        <Route path="/delete-topic/:topicId" element={<DeleteTopic />} />
        <Route path="/topics/:topicId" element={<TopicById />} />
        <Route path="/topics/:topicId/delete-answer/:answerId" element={<DeleteAnswer />} />
        
        <Route path="/categories" element={<ListCategory />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
        <Route path="/delete-category/:categoryId" element={<DeleteCategory />} />
      </Route>
    </Routes>
  );
};

export default Main;
