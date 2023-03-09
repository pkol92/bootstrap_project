import React, { FC } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

type ItemProps = {
  id: number;
  name: string;
  price: string;
  description: string;
};

interface FoodCardProps {
  item: ItemProps;
  setOrdered: () => void;
}

export const FoodCard: FC<FoodCardProps> = ({ item, setOrdered }) => {
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
          onClick={() => setOrdered()}
          className='mt-auto font-weight-bold'
          variant='success'>
          Order
        </Button>
      </Card.Body>
    </Card>
  );
};
