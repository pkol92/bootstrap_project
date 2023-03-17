import React from 'react';
import { Toast } from 'react-bootstrap';

export const Confirmation = ({
  toggle,
}: {
  toggle: (arg: boolean) => void;
}) => {
  return (
    <Toast onClose={() => toggle(false)}>
      <Toast.Header className='d-flex justify-content-lg-space-evenly'>
        <strong className='mr-auto'>Product is added to your card!</strong>
        <small className='mr-auto'>just now</small>
      </Toast.Header>
      <Toast.Body>Remember to check your order</Toast.Body>
    </Toast>
  );
};
