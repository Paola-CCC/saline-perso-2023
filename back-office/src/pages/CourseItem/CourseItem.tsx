import React, { FC } from 'react';
import './CourseItem.scss';

interface CourseItemProps {}

const CourseItem: FC<CourseItemProps> = () => (
  <div className="CourseItem" data-testid="CourseItem">
    CourseItem Component
  </div>
);

export default CourseItem;
