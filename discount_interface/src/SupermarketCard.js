import React from 'react';

import { Card, Button } from 'react-bootstrap';

const SupermarketCard = ({ name, link }) => (
<Card style={{ width: '18rem', margin: '10px' }}>
  <Card.Img variant="top" src={link} />
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
);

export default SupermarketCard;