import React, { FC } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Product } from '../types';

interface UserCardProps {
  item: Product;
  deleteItem: (item: Product) => void;
}

export const UserCard: FC<UserCardProps> = ({ item, deleteItem }) => {
  return (
    <Card className='h-100 shadow-sm bg-white rounded' key={item.id}>
      <Card.Body className='d-flex mb-2 flex-column'>
        <Card.Title className=' mb-3 d-flex justify-content-between'>
          <Card.Title className='mb-1 mt-auto'>{item.name}</Card.Title>
          <Badge pill className='mb-1 bg-warning d-flex align-self-start'>
            {item.price}$
          </Badge>
        </Card.Title>

        <Card.Text>{item.description}</Card.Text>
        <Button
          onClick={() => deleteItem(item)}
          className='mt-auto font-weight-bold'
          variant='success'>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};
