import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { ReactComponent as CardShopping } from '../icons/cart-shopping.svg';

export const Menu = () => {
  return (
    <Navbar variant='dark' bg='dark' expand='lg'>
      <Container fluid className='px-4'>
        <Navbar.Brand href='#home'>PizzaLove</Navbar.Brand>

        <Nav className='ms-auto pe-2'>
          <CardShopping width='18px' />
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
