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
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
);

export default HeaderBar;