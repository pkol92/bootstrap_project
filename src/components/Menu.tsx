import React from 'react';
import {
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  NavItem,
} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { ReactComponent as CardShopping } from '../icons/cart-shopping.svg';
import { DropDown } from './DropDown';

export const Menu = () => {
  return (
    <Navbar variant='dark' bg='dark' expand='lg'>
      <Container fluid>
        <Navbar.Brand href='#home'>PizzaLove</Navbar.Brand>
        <Container className='d-flex flex-row  justify-content-end'>
          <Nav className='justify-self-end'>
            <CardShopping width='20px' />
          </Nav>
          <Navbar.Toggle aria-controls='navbar-dark-example' />
          <Navbar.Collapse
            id='navbar-dark-example '
            className='justify-content-end'>
            <Nav>
              <NavDropdown
                id='nav-dropdown-dark-example'
                title='My account'
                menuVariant='dark'>
                <NavDropdown.Item href='#action/3.1'>
                  My profile
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Settings</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.3'>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>

    // <nav className='navbar navbar-expand-lg bg-body-tertiary'>
    //   <div className='container-fluid'>
    //     <a className='navbar-brand' href='#'>
    //       <h2>PizzaLove</h2>
    //     </a>

    //     <div className='d-flex align-items-center'>
    //       <a className='nav-link' href='#'>
    //         <CardShopping width='20px' />
    //       </a>
    //       <DropDown />
    //     </div>
    //   </div>
    // </nav>
  );
};
