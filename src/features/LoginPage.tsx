import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { LoginForm } from '../components/LoginForm';
import { Menu } from '../components/Menu';

export const LoginPage = () => {
  return (
    <Container fluid className='g-0'>
      <Menu />
      <Container
        className='d-flex justify-content-center g-0 '
        id='LoginFormContainer'>
        <LoginForm />
      </Container>
    </Container>
  );
};
