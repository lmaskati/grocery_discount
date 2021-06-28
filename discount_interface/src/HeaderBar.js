import React from 'react';

import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';




const HeaderBar = ({handle}) => (

  <Navbar bg="dark" variant="dark">
    <Navbar.Brand onClick={()=> {handle()}}>Liyaan's Cool Grocery Site</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link onClick={()=> console.log("Fair Price")}>Fair Price</Nav.Link>
      <Nav.Link onClick={()=> console.log("Cold Storage")}>Cold Storage</Nav.Link>
      
    </Nav>
    
  </Navbar>
);

export default HeaderBar;