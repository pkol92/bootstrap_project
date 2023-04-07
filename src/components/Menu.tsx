import React, { useMemo } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { ReactComponent as CardShopping } from '../icons/cart-shopping.svg';
import { Product } from '../types';

export const getSumOfItems = (products: Array<Product>) => {
  return products.reduce((product, value) => product + value.amount, 0);
};

export const Menu = () => {
  const { user, logout } = useAuthContext();

  const memoSumOfProducts = useMemo(() => {
    const { products } = user || { products: [] };
    return getSumOfItems(products);
  }, [user]);

  return (
    <Navbar variant='dark' bg='dark' expand='lg' data-testid='menu'>
      <Container fluid className='px-4 gap-4'>
        <Navbar.Brand data-testid='brand'>
          <Link
            to='/'
            style={{ textDecoration: 'none', color: 'white' }}
            data-testid='brand-link'>
            PizzaLove
          </Link>
        </Navbar.Brand>
        {!user && (
          <>
            <Nav className='ms-auto'>
              <Link
                to='/login'
                data-testid='login'
                style={{ textDecoration: 'none', color: 'white' }}>
                Login
              </Link>
            </Nav>
            <Nav>
              <Link
                to='/register'
                data-testid='register'
                style={{ textDecoration: 'none', color: 'white' }}>
                Register
              </Link>
            </Nav>
          </>
        )}

        {user && (
          <>
            <Nav className='ms-auto pe-2'>
              <Link
                to='/my-card'
                style={{ position: 'relative' }}
                data-testid='my-card-link'>
                <CardShopping width='18px' />
                {user.products.length > 0 && (
                  <Badge
                    pill
                    bg='warning'
                    text='dark'
                    style={{ fontSize: '8px', position: 'absolute' }}
                    data-testid='badge'>
                    +{memoSumOfProducts}
                  </Badge>
                )}
              </Link>
            </Nav>

            <Navbar.Toggle
              aria-controls='responsive-navbar-dark-example'
              data-testid='menu-toggle'
            />
            <Navbar.Collapse
              id='responsive-navbar-dark'
              className='flex-grow-0 mr-auto'>
              <Nav className=''>
                <NavDropdown
                  data-testid='menu-dropdown'
                  id='nav-dropdown-dark-example'
                  title='My account'
                  menuVariant='dark'
                  align='end'>
                  <NavDropdown.Item
                    href='#action/3.1'
                    data-testid='menu-dropdown-item1'>
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href='#action/3.2'
                    data-testid='menu-dropdown-item2'>
                    Settings
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href='#action/3.3'
                    onClick={logout}
                    data-testid='logout'>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};
