import React, { FC } from 'react';
import './EntrepriseList.scss';

interface EntrepriseListProps {}

const EntrepriseList: FC<EntrepriseListProps> = () => (
  <div className="EntrepriseList" data-testid="EntrepriseList">
    EntrepriseList Component
  </div>
);

export default EntrepriseList;
