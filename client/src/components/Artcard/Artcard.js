import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import jokerart from './jokerart.jpg'

const Artcard = (props) => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <CardImg top width="100%" src={ jokerart } alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Mad Joker</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">By: Sir-Spanks</CardSubtitle>
          <CardText>This is a self portrait of me on Monday mornings</CardText>
          <Button>Contact</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Artcard;