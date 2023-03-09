/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { FoodCard } from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Confirmation } from './components/Confirmation';
import { useState } from 'react';
import { mockData } from './components/mockData';
import { Menu } from './components/Menu';

function App() {
  const [toggle, setToggle] = useState(false);

  const displayConfirmation = () => {
    setToggle(true);

    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };

  return (
    <Container>
      <Menu />
      <Container>
        <Row className='d-flex align-content-center justify-content-lg-center'>
          {mockData.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={2} className='mb-4'>
              <FoodCard item={item} setOrdered={() => displayConfirmation()} />
            </Col>
          ))}
        </Row>
        {toggle && <Confirmation toggle={setToggle} />}
      </Container>
    </Container>
  );
}

export default App;
