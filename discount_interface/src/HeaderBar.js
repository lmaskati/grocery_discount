import React from 'react';

import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';




const HeaderBar = ({goHome, handle}) => (

  <Navbar bg="dark" variant="dark">
    <Navbar.Brand onClick={()=> {goHome()}}>Liyaan's Cool Grocery Site</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={()=> {handle()}}>Fair Price</Nav.Link>
      <Nav.Link onClick={()=> {handle()}}>Cold Storage</Nav.Link>
      
    </Nav>
    
  </Navbar>
);

export default HeaderBar;