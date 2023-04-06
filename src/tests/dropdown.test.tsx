/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { DropDown } from '../components/DropDown';

describe('Dropdown', () => {
  test('is render', () => {
    render(<DropDown />);

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-toggle')).toBeInTheDocument();
  });

  test('is toggled', () => {
    render(<DropDown />);

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('dropdown-actions')).toBeInTheDocument();
  });
});
