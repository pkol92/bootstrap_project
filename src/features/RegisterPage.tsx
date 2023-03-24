import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Menu } from '../components/Menu';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage = () => {
  return (
    <Container fluid className='g-0'>
      <Menu />
      <Container
        fluid
        className='d-flex justify-content-center g-0'
        id='registerFormContainer'>
        <RegisterForm />
      </Container>
    </Container>
  );
};
