import React from "react";
import { Nav, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import parser from "react-html-parser";

function MyCard(props) {
  const page = useSelector((state) => state.componentsInfo);

  let gelenler;
  page
    .filter((card, i) => card.id === props.id)
    .map((item, id) => {
      gelenler = item;
    });

  if (gelenler !== undefined)
    return (
      <Card>
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
              <Card.Title>{gelenler.title}</Card.Title>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Text>{parser(gelenler.content)}</Card.Text>
        </Card.Body>
      </Card>
    );

  return <div>This component deleted. </div>;
}

export default MyCard;
