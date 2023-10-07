import React, { FC } from 'react';
import './CoursesItem.scss';

interface CoursesItemProps {}

const CoursesItem: FC<CoursesItemProps> = () => (
  <div className="CoursesItem" data-testid="CoursesItem">
    CoursesItem Component
  </div>
);

export default CoursesItem;
