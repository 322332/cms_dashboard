import React from "react";
import { Nav, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import parser from "react-html-parser";

function MyCard2(props) {
  const page = useSelector((state) => state.componentsInfo);

  let gelenler;
  page
    .filter((card, i) => card.id === props.id)
    .map((item, id) => {
      gelenler = item;
    });
  return (
    <Card>
      <Card.Header>
        <Nav variant="pills" defaultActiveKey="#first">
          <Nav.Item>
            <Card.Title>{gelenler.title}</Card.Title>
          </Nav.Item>
        </Nav>
      </Card.Header>
    </Card>
  );
}

export default MyCard2;
