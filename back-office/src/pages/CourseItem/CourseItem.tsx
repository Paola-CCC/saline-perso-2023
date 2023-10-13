import React, { FC } from 'react';
import './CourseItem.scss';
import { Outlet } from 'react-router-dom';

interface CourseItemProps {}

const CourseItem: FC<CourseItemProps> = () => (
  <div className="CourseItem" data-testid="CourseItem">
    CourseItem Component
    <Outlet />
  </div>
);

export default CourseItem;
