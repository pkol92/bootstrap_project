/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/react-in-jsx-scope */
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Menu } from './components/Menu';

import { FoodPage } from './features/FoodPage';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <Container fluid className='g-0'>
      <Menu />
      <FoodPage />
    </Container>
  );
}

export default App;
