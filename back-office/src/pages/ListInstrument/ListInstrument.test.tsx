import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListInstrument from './ListInstrument';

describe('<ListInstrument />', () => {
  test('it should mount', () => {
    render(<ListInstrument />);
    
    const listInstrument = screen.getByTestId('ListInstrument');

    expect(listInstrument).toBeInTheDocument();
  });
});