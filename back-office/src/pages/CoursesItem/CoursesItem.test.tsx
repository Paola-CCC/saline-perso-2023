import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CoursesItem from './CoursesItem';

describe('<CoursesItem />', () => {
  test('it should mount', () => {
    render(<CoursesItem />);
    
    const coursesItem = screen.getByTestId('CoursesItem');

    expect(coursesItem).toBeInTheDocument();
  });
});