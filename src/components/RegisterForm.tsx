import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { americanStates } from '../mocks/americanStates';

export const RegisterForm = () => {
  return (
    <Form className='m-md-3 mt-md-5 p-4'>
      <h3 className='mb-4'>Register Form</h3>
      <hr />
      <Row className='mb-3'>
        <Col md={3} className='mb-3'>
          <h6>Personal data</h6>
        </Col>
        <Col>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              md={6}
              controlId='formGridName'
              className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder='John' type='text' />
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              md={6}
              controlId='formGridLastName'
              className='mb-3'>
              <Form.Label>Last name</Form.Label>
              <Form.Control placeholder='Doe' type='text' />
            </Form.Group>
            <Form.Group as={Col} controlId='ControlTextarea' className='mb-3'>
              <Form.Label>About you</Form.Label>
              <Form.Control as='textarea' rows={4} />
            </Form.Group>
          </Row>
        </Col>
      </Row>
      <hr />

      <Row className='mb-3'>
        <Col md={3} className='mb-3'>
          <h6>Address details</h6>
        </Col>
        <Col>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              md={6}
              controlId='formGridAddress1'
              className='mb-3'>
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder='1234 Main St' />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId='formGridState'>
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue='Choose...'>
                {Object.entries(americanStates).map(([key, value]) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} xs={12} md={6} controlId='formGridCity'>
              <Form.Label>City</Form.Label>
              <Form.Control placeholder='Los Angeles' />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId='formGridZip'>
              <Form.Label>Zip</Form.Label>
              <Form.Control type='text' pattern='[0-9]*' />
            </Form.Group>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row className='mb-3'>
        <Col md={3} className='mb-3'>
          <h6>Login data</h6>
        </Col>
        <Col>
          <Form.Group as={Col} controlId='formBasicEmail' className='mb-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} controlId='formBasicPassword' className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>

          <Form.Group as={Col} controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              label='I read the regulations and accept the conditions'
            />
          </Form.Group>
        </Col>
      </Row>

      <div className='d-flex'>
        <Button variant='primary' type='submit' className='ms-auto'>
          Submit
        </Button>
      </div>
    </Form>
  );
};
