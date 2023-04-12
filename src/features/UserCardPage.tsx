import { Container, Row } from 'react-bootstrap';
import { Menu } from '../components/Menu';
import { ProtectedPage } from '../components/ProtectedPage';
import { UserCard } from '../components/UserCard';
import { useAuthContext } from '../context/authContext';

export const UserCardPage = () => {
  const { user } = useAuthContext();

  return (
    <ProtectedPage>
      <Menu data-testid='menu' />
      <Container className='p-2 p-md-5' fluid data-testid='container'>
        <Row className='d-flex align-content-center justify-content-center p-4'>
          {user && user.products.length > 0 ? (
            <UserCard items={user.products} data-testid='cards' />
          ) : (
            <h1
              className='d-flex align-content-center justify-content-center'
              data-testid='empty-card-info'>
              Your card is empty
            </h1>
          )}
        </Row>
      </Container>
    </ProtectedPage>
  );
};
