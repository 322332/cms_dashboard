import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Router from "../routes";

export default function TheSidebar() {
  return (
    <ListGroup defaultActiveKey="#link1">
      {Router.map((item, id) =>
        item.name === "DragDropArea" ? (
         null
        ) : (
          <ListGroup.Item key={id}>
            <Link to={item.path}>{item.name}</Link>
          </ListGroup.Item>
        )
      )}
    </ListGroup>
  );
}
