import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../context/authContext';

export const LoginForm = () => {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const handleChangeInfo = useCallback((field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    login(userData.email, userData.password);
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <Form
      className='mt-sm-5 mb-3  p-5'
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id='loginForm'>
      <Form.Group controlId='formBasicEmail' className='mb-3'>
        <Form.Control
          required
          type='email'
          placeholder='Email address'
          onChange={handleChangeInfo('email')}
        />
        <Form.Control.Feedback type='invalid'>
          Email is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='formBasicPassword' className='mb-3'>
        <Form.Control
          required
          type='password'
          placeholder='Password'
          onChange={handleChangeInfo('password')}
        />
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
