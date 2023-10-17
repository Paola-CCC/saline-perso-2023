import React, { FC } from 'react';
import './ListCategory.scss';

interface ListCategoryProps {}

const ListCategory: FC<ListCategoryProps> = () => (
  <div className="ListCategory" data-testid="ListCategory">
    ListCategory Component
  </div>
);

export default ListCategory;
