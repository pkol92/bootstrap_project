import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FoodCard } from '../components/Card';
import { Confirmation } from '../components/Confirmation';
import { useAuthContext } from '../context/authContext';
import { mockData } from '../mocks/mockData';
import { Product } from '../types';

export const FoodPage = () => {
  const [toggle, setToggle] = useState(false);
  const { addProduct } = useAuthContext();

  const displayConfirmation = () => {
    setToggle(true);

    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };

  const handleOrder = (item: Product) => {
    displayConfirmation();
    addProduct(item);
  };
  return (
    <Container className='mt-5'>
      <Row className='d-flex align-content-center justify-content-xxl-center'>
        {mockData.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={3} className='mb-4'>
            <FoodCard item={item} setOrdered={() => handleOrder(item)} />
          </Col>
        ))}
      </Row>
      {toggle && <Confirmation toggle={setToggle} />}
    </Container>
  );
};
