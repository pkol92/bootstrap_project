/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LoginForm } from '../components/LoginForm';
import { BrowserRouter } from 'react-router-dom';

const mockedFunction = jest.fn();

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

const MockLoginForm = () => {
  return (
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
};

describe('Login form', () => {
  test('is render', () => {
    render(<MockLoginForm />);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('inputs change values', () => {
    render(<MockLoginForm />);
    const inputLogin = screen.getByTestId('email-input') as HTMLInputElement;
    const inputPassword = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;

    userEvent.type(inputLogin, 'john@wp.pl');
    userEvent.type(inputPassword, 'password');

    expect(inputLogin.value).toBe('john@wp.pl');
    expect(inputPassword.value).toBe('password');
  });

  test('show error after entered wrong email', async () => {
    render(<MockLoginForm />);
    const inputLogin = screen.getByTestId('email-input') as HTMLInputElement;
    const inputPassword = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;

    userEvent.type(inputLogin, 'p@wp.pl');
    userEvent.type(inputPassword, 'password');
    userEvent.click(await screen.findByTestId('submit-button'));

    expect(screen.getByTestId('email-error')).toBeInTheDocument();
  });

  test('show error after entered wrong password', async () => {
    render(<MockLoginForm />);
    const inputLogin = screen.getByTestId('email-input') as HTMLInputElement;
    const inputPassword = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;

    userEvent.type(inputLogin, 'john@wp.pl');
    userEvent.type(inputPassword, 'pa');
    userEvent.click(await screen.findByTestId('submit-button'));

    expect(screen.getByTestId('password-error')).toBeInTheDocument();
  });

  test('redirect after correct login', async () => {
    render(<MockLoginForm />);
    const inputLogin = screen.getByTestId('email-input') as HTMLInputElement;
    const inputPassword = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;

    userEvent.type(inputLogin, 'john@wp.pl');
    userEvent.type(inputPassword, 'password');
    userEvent.click(await screen.findByTestId('submit-button'));

    await new Promise(process.nextTick);

    expect(mockedFunction).toBeCalled();
  });
});
