import React from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

import { ReactComponent as CardShopping } from '../icons/cart-shopping.svg';

export const Menu = () => {
  const { user } = useAuthContext();

  return (
    <Navbar variant='dark' bg='dark' expand='lg'>
      <Container fluid className='px-4'>
        <Navbar.Brand href='#home'>PizzaLove</Navbar.Brand>

        <Nav className='ms-auto pe-4'>
          <Link style={{ position: 'relative' }} to='/my-card'>
            <CardShopping width='18px' />
            {user && user?.products.length > 0 && (
              <Badge
                pill
                bg='warning'
                text='dark'
                style={{ fontSize: '8px', position: 'absolute' }}>
                +{user?.products.length}
              </Badge>
            )}
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls='responsive-navbar-dark-example' />
        <Navbar.Collapse
          id='responsive-navbar-dark'
          className='flex-grow-0 mr-auto'>
          <Nav className=''>
            <NavDropdown
              id='nav-dropdown-dark-example'
              title='My account'
              menuVariant='dark'
              align='end'>
              <NavDropdown.Item href='#action/3.1'>My profile</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Settings</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.3'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
