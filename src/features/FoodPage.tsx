import { memo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FoodCard } from '../components/Card';
import { Confirmation } from '../components/Confirmation';
import { useAuthContext } from '../context/authContext';
import { useDispatchContext } from '../context/productsContext';
import { Product } from '../types';

export const FoodPage = memo(function FoodPage({
  products,
}: {
  products: Array<Product>;
}) {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuthContext();
  const dispatch = useDispatchContext();
  const navigate = useNavigate();

  const displayConfirmation = () => {
    setToggle(true);

    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };

  const handleOrder = (newProduct: Product) => {
    if (!user) {
      navigate('/login');
    } else {
      displayConfirmation();
      const product = user.products.find((item) => item.id === newProduct.id);

      if (product) {
        dispatch({ type: 'UPDATE', payload: { product: newProduct } });
      } else {
        dispatch({ type: 'ADD', payload: newProduct });
      }
    }
  };

  return (
    <Container className='mt-5' data-testid='container'>
      <Row
        className='d-flex align-content-center justify-content-xxl-center'
        data-testid='products'>
        {products.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={3} className='mb-4'>
            <FoodCard item={item} addItem={() => handleOrder(item)} />
          </Col>
        ))}
      </Row>
      {toggle && <Confirmation toggle={setToggle} data-testid='confirmation' />}
    </Container>
  );
});
