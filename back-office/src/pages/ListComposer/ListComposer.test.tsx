import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListComposer from './ListComposer';

describe('<ListComposer />', () => {
  test('it should mount', () => {
    render(<ListComposer />);
    
    const listComposer = screen.getByTestId('ListComposer');

    expect(listComposer).toBeInTheDocument();
  });
});