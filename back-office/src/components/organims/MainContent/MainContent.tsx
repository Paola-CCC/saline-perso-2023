import React, { FC } from 'react';
import './MainContent.scss';

interface MainContentProps {}

const MainContent: FC<MainContentProps> = () => (
  <div className="MainContent" data-testid="MainContent">
    MainContent Component
  </div>
);

export default MainContent;
