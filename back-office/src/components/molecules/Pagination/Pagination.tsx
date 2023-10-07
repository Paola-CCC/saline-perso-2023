import React, { FC } from 'react';
import './Pagination.scss';

interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => (
  <div className="Pagination" data-testid="Pagination">
    Pagination Component
  </div>
);

export default Pagination;
