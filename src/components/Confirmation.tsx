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
        <strong className='mr-auto'>Product is added to your order!</strong>
        <small className='mr-auto'>just now</small>
      </Toast.Header>
      <Toast.Body>Your dish will be ready in 30 minutes!</Toast.Body>
    </Toast>
  );
};
