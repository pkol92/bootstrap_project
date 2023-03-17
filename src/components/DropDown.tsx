import React from 'react';
import Dropdown from 'react-bootstrap/esm/Dropdown';

export const DropDown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='info' id='dropdown-basic'>
        My account
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href='#/action-1'>My Profile</Dropdown.Item>
        <Dropdown.Item href='#/action-2'>Settings</Dropdown.Item>
        <Dropdown.Item href='#/action-3'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
