import React, { FC } from 'react';
import './CoursesList.scss';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = () => (
  <div className="CoursesList" data-testid="CoursesList">
    CoursesList Component
  </div>
);

export default CoursesList;
