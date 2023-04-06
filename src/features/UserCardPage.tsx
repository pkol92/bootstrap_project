import React from 'react';
import { Container, Row } from 'react-bootstrap';

import { Menu } from '../components/Menu';
import { UserCard } from '../components/UserCard';
import { useAuthContext } from '../context/authContext';

export const UserCardPage = () => {
  const { user, deleteProduct } = useAuthContext();

  return (
    <>
      <Menu />
      <Container className='mt-5'>
        <Row className='d-flex align-content-center justify-content-xxl-center'>
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
