import React, { FormEvent, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { americanStates } from '../mocks/americanStates';

export const RegisterForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Form
      className='m-md-3 mt-md-5 p-4'
      noValidate
      validated={validated}
      onSubmit={handleSubmit}>
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
              <Form.Control required placeholder='John' type='text' />
              <Form.Control.Feedback type='invalid'>
                First name is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              md={6}
              controlId='formGridLastName'
              className='mb-3'>
              <Form.Label>Last name</Form.Label>
              <Form.Control required placeholder='Doe' type='text' />
              <Form.Control.Feedback type='invalid'>
                Last name is required
              </Form.Control.Feedback>
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
              <Form.Control required placeholder='1234 Main St' />
              <Form.Control.Feedback type='invalid'>
                Address name is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId='formGridState'>
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue='Choose...' required>
                {Object.entries(americanStates).map(([key, value]) => (
                  <option key={key}>{value}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>
                State is required
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} xs={12} md={6} controlId='formGridCity'>
              <Form.Label>City</Form.Label>
              <Form.Control required placeholder='Los Angeles' />
              <Form.Control.Feedback type='invalid'>
                City is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId='formGridZip'>
              <Form.Label>Zip</Form.Label>
              <Form.Control required type='text' pattern='[0-9]*' />
              <Form.Control.Feedback type='invalid'>
                Zip is required
              </Form.Control.Feedback>
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
            <Form.Control required type='email' placeholder='Enter email' />
            <Form.Control.Feedback type='invalid'>
              Email is required
            </Form.Control.Feedback>
            <Form.Text className='text-muted'>
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} controlId='formBasicPassword' className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control required type='password' placeholder='Password' />
            <Form.Control.Feedback type='invalid'>
              Password is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              label='I read the regulations and accept the conditions'
              required
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
