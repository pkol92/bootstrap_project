import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FoodCard } from '../components/Card';
import { Menu } from '../components/Menu';
import { UserCard } from '../components/UserCard';
import { useAuthContext } from '../context/authContext';
import { mockData } from '../mocks/mockData';

export const UserCardPage = () => {
  const { user, deleteProduct } = useAuthContext();
  return (
    <>
      <Menu />
      <Container className='mt-5'>
        <Row className='d-flex align-content-center justify-content-xxl-center'>
          {user && user.products.length > 0 ? (
            user.products.map(
              (item) =>
                item && (
                  <Col key={item.id} xs={12} md={6} lg={3} className='mb-4'>
                    <UserCard
                      item={item}
                      deleteItem={() => {
                        deleteProduct(item);
                      }}
                    />
                  </Col>
                )
            )
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
