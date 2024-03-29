import React, { FC } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Product } from '../types';

interface FoodCardProps {
  item: Product;
  addItem: (item: Product) => void;
}

export const FoodCard: FC<FoodCardProps> = ({ item, addItem }) => {
  return (
    <Card
      className='h-100 shadow-sm bg-white rounded'
      key={item.id}
      data-testid='food-card'>
      <Card.Body className='d-flex mb-2 flex-column'>
        <Card.Title className=' mb-3 d-flex justify-content-between'>
          <Card.Title className='mb-1 mt-auto'>{item.name}</Card.Title>
          <Badge pill className='mb-1 bg-warning d-flex align-self-start'>
            {item.price}$
          </Badge>
        </Card.Title>

        <Card.Text>{item.description}</Card.Text>
        <Button
          data-testid='food-card-button'
          onClick={() => addItem(item)}
          className='mt-auto font-weight-bold'
          variant='success'>
          Order
        </Button>
      </Card.Body>
    </Card>
  );
};
