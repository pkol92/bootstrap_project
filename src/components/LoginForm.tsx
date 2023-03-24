import React, { FormEvent, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';

export const LoginForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Form
      className='mt-sm-5 mb-3  p-5'
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id='loginForm'>
      <Form.Group controlId='formBasicEmail' className='mb-3'>
        <Form.Control required type='email' placeholder='Email address' />
        <Form.Control.Feedback type='invalid'>
          Email is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='formBasicPassword' className='mb-3'>
        <Form.Control required type='password' placeholder='Password' />
        <Form.Control.Feedback type='invalid'>
          Password is required
        </Form.Control.Feedback>
      </Form.Group>
      <Row className='g-0'>
        <Button variant='primary' type='submit' className='ms-auto mt-4'>
          Log in
        </Button>
      </Row>
    </Form>
  );
};
