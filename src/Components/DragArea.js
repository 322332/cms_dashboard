import React from "react";
import { Card } from "react-bootstrap";
import { ItemTypes } from "../Utils/ItemTypes";

import MyCard from "./Card/MyCard2";
import Carousel from "./Carousel/Carousel";

import { useDrag } from "react-dnd";

function DragArea({ id, componentName }) {
  const [{ isDrag }, dragRef] = useDrag({
    item: { type: ItemTypes.CARD, id: id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  console.log(componentName);

  switch (componentName) {
    case "content":
      return (
        <Card ref={dragRef} bg={isDrag ? "danger" : ""}>
          <MyCard id={id} />
        </Card>
      );

    case "carousel":
      return (
        <Card ref={dragRef} bg={isDrag ? "danger" : ""}>
          <Carousel />
        </Card>
      );
    default:
      return <div>this component not implemented</div>;
  }
}

export default DragArea;
