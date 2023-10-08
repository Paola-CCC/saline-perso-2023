import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListCategory from './ListCategory';

describe('<ListCategory />', () => {
  test('it should mount', () => {
    render(<ListCategory />);
    
    const listCategory = screen.getByTestId('ListCategory');

    expect(listCategory).toBeInTheDocument();
  });
});