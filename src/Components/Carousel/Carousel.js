import React from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
export default function ControlledCarousel(props) {
  const page = useSelector((state) => state.componentsInfo);

  let gelenler;
  page
    .filter((card, i) => card.id === props.id)
    .map((item, id) => {
      gelenler = item;
    });

  console.log(gelenler);

  return (
    <Carousel>
      {gelenler.items.map((item) => (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={"http://localhost:3000" + item.src}
            alt="First slide"
          />
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
