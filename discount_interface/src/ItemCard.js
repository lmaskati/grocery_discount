import React from 'react';

import { Card, Button } from 'react-bootstrap';

const ItemCard = ({name, discount, old_price}) => (
<Card style={{ width: '18rem', margin: '10px' }}>

  <Card.Img variant="top" />
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Text>
    {`Discounted price: ${discount}`}
        <br></br>
    {`Old price: ${old_price}`}
    </Card.Text>
  </Card.Body>
</Card>
);

export default ItemCard;