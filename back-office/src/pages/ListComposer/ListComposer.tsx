import React, { FC } from 'react';
import './ListComposer.scss';

interface ListComposerProps {}

const ListComposer: FC<ListComposerProps> = () => (
  <div className="ListComposer" data-testid="ListComposer">
    ListComposer Component
  </div>
);

export default ListComposer;
