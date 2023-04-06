/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Confirmation } from '../components/Confirmation';

const mockedFunction = jest.fn();

describe('Toast with confirmation', () => {
  test('is render', () => {
    render(<Confirmation toggle={mockedFunction} />);

    expect(screen.getByTestId('confirmation')).toBeInTheDocument();
    expect(screen.getByTestId('confirmation-header')).toBeInTheDocument();
    expect(screen.getByTestId('confirmation-body')).toBeInTheDocument();
  });

  test('is toggled', () => {
    render(<Confirmation toggle={mockedFunction} />);
    const closeBtn = screen.getByRole('button');

    userEvent.click(closeBtn);

    expect(mockedFunction).toBeCalled();
  });
});
