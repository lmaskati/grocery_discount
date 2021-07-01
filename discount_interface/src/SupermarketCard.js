import React from 'react';

import { Card, Button } from 'react-bootstrap';

const SupermarketCard = ({ name, id, link, handle }) => (
<Card style={{ width: '18rem', margin: '10px' }}>
  <Card.Img variant="top" src={link} />
  <Card.Body>
    <Card.Title className="d-flex align-items-center justify-content-center">{name}</Card.Title>
    <div className="d-flex align-items-center justify-content-center">
    <Button onClick={()=> {handle(id)}} variant="primary">{name} Discounts</Button>
    </div>
  </Card.Body>
</Card>
);

export default SupermarketCard;