/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/react-in-jsx-scope */
import './App.scss';
import { FoodCard, mockData } from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Confirmation } from './components/Confirmation';
import { useState } from 'react';

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
      <Row>
        {mockData.map((item) => (
          <Col key={item.id} xs={6} className='mb-4'>
            <FoodCard item={item} setOrdered={() => displayConfirmation()} />
          </Col>
        ))}
      </Row>
      {<Confirmation toggle={setToggle} />}
    </Container>
  );
}

export default App;
