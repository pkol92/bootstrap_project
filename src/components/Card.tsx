import React, { FC } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

export const mockData = [
  { id: 1, name: 'Pizza', price: '2.99' },
  { id: 2, name: 'Chicken with rice', price: '1.99' },
  { id: 3, name: 'Potato with vegetables', price: '0.99' },
  { id: 4, name: 'Onion soup', price: '3.00' },
  { id: 5, name: 'Fries', price: '2.05' },
];

type ItemProps = {
  id: number;
  name: string;
  price: string;
};

interface FoodCardProps {
  item: ItemProps;
  setOrdered: () => void;
}

export const FoodCard: FC<FoodCardProps> = ({ item, setOrdered }) => {
  return (
    <Card className='h-100 shadow-sm bg-white rounded' key={item.id}>
      <Card.Body className='d-flex mb-1 flex-column'>
        <Card.Title>{item.name}</Card.Title>
        <Badge className='mb-1 bg-warning'>{item.price}$</Badge>
        <Button
          onClick={() => setOrdered()}
          className='mt-auto font-weight-bold'
          variant='success'>
          Order
        </Button>
      </Card.Body>
    </Card>
  );
};
