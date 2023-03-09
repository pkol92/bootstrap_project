import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

export const Confirmation = ({
  toggle,
}: {
  toggle: (arg: boolean) => void;
}) => {
  return (
    <Toast onClose={() => toggle(false)}>
      <Toast.Header>
        <strong className='mr-auto'>Product is added to your order!</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body>Your dish will be ready in 30 minutes!</Toast.Body>
    </Toast>
  );
};
