import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { Menu } from '../components/Menu';
import { UserCard } from '../components/UserCard';
import { useAuthContext } from '../context/authContext';

export const UserCardPage = () => {
  const { user, deleteProduct } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Menu />
      <Container className='p-2 p-md-5' fluid>
        <Row className='d-flex align-content-center justify-content-center p-4'>
          {user && user.products.length > 0 ? (
            <UserCard items={user.products} deleteItem={deleteProduct} />
          ) : (
            <h1 className='d-flex align-content-center justify-content-center'>
              Your card is empty
            </h1>
          )}
        </Row>
      </Container>
    </>
  );
};
