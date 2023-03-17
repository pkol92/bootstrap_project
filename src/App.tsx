/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { FoodCard } from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Confirmation } from './components/Confirmation';
import { useState } from 'react';
import { mockData } from './mocks/mockData';
import { Menu } from './components/Menu';
import { useAuthContext } from './context/authContext';
import { Product } from './types';

function App() {
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
    <Container fluid className='g-0'>
      <Menu />
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
    </Container>
  );
}

export default App;
