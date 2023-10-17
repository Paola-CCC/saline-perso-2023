import React, { FC } from 'react';
import './ListInstrument.scss';

interface ListInstrumentProps {}

const ListInstrument: FC<ListInstrumentProps> = () => (
  <div className="ListInstrument" data-testid="ListInstrument">
    ListInstrument Component
  </div>
);

export default ListInstrument;
