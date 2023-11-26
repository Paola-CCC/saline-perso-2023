import React, { FC } from 'react';
import './StudentsList.scss';

interface StudentsListProps {}

const StudentsList: FC<StudentsListProps> = () => (
  <div className="StudentsList" data-testid="StudentsList">
    StudentsList Component
  </div>
);

export default StudentsList;
