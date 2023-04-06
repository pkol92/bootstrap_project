import React from 'react';
import { Dropdown } from 'react-bootstrap';

export const DropDown = () => {
  return (
    <Dropdown data-testid='dropdown'>
      <Dropdown.Toggle
        variant='info'
        id='dropdown-basic'
        data-testid='dropdown-toggle'>
        My account
      </Dropdown.Toggle>

      <Dropdown.Menu data-testid='dropdown-actions'>
        <Dropdown.Item href='#/action-1'>My Profile</Dropdown.Item>
        <Dropdown.Item href='#/action-2'>Settings</Dropdown.Item>
        <Dropdown.Item href='#/action-3'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
