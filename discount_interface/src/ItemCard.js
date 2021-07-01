import React from 'react';

import { Card, Button } from 'react-bootstrap';

const ItemCard = ({name, discount, cur_price, category, src}) => (
<Card style={{ width: '18rem', margin: '10px' }}>

  <Card.Img variant="top" src={src} />
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Text>
    {`Discounted price: ${discount}`}
        <br></br>
    {`Current price: ${cur_price}`}
        <br></br>
    {`Category: ${category}`}
    </Card.Text>
  </Card.Body>
</Card>
);

export default ItemCard;