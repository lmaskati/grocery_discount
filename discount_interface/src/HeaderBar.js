import React from 'react';

import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';
 
const HeaderBar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Liyaan's Cool Grocery Site</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Store 1</Nav.Link>
      <Nav.Link href="#features">Store 2</Nav.Link>
      <Nav.Link href="#pricing">Store 3</Nav.Link>
    </Nav>
    
  </Navbar>
);

export default HeaderBar;