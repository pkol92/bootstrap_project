import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FoodCard } from '../components/Card';
import { Confirmation } from '../components/Confirmation';
import { useAuthContext } from '../context/authContext';
import { useDispatchContext } from '../context/productsContext';
import { mockData as mockProducts } from '../mocks/mockData';
import { Product } from '../types';

export const FoodPage = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuthContext();
  const dispatch = useDispatchContext();

  const displayConfirmation = () => {
    setToggle(true);

    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };

  const handleOrder = (newProduct: Product) => {
    displayConfirmation();
    if (!user) return;

    const product = user.products.find((item) => item.id === newProduct.id);

    if (product) {
      dispatch({ type: 'UPDATE', payload: { product: newProduct } });
    } else {
      dispatch({ type: 'ADD', payload: newProduct });
    }
  };

  return (
    <Container className='mt-5'>
      <Row className='d-flex align-content-center justify-content-xxl-center'>
        {mockProducts.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={3} className='mb-4'>
            <FoodCard item={item} addItem={() => handleOrder(item)} />
          </Col>
        ))}
      </Row>
      {toggle && <Confirmation toggle={setToggle} />}
    </Container>
  );
};
