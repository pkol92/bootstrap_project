import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Menu } from '../components/Menu';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterFormPage = () => {
  return (
    <Container fluid className='g-0'>
      <Menu />
      <Container className='d-flex justify-content-center'>
        <RegisterForm />
      </Container>
    </Container>
  );
};
