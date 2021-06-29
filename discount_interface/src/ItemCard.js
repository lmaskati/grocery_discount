import React from 'react';

import { Card, Button } from 'react-bootstrap';

const ItemCard = () => (
<Card style={{ width: '18rem', margin: '10px' }}>
  <Card.Img variant="top" />
  <Card.Body>
    <Card.Title>Gello</Card.Title>
    <Card.Text>
        This is a longer card with supporting text below as a natural
        lead-in to additional content. This content is a little bit longer.
    </Card.Text>
  </Card.Body>
</Card>
);

export default ItemCard;