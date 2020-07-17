import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import { ItemTypes } from "../Utils/ItemTypes";

//dynamic component eklenecek
import MyCard from "./Card/MyCard";
import Carousel from "./Carousel/Carousel";

export default function BoxTarget(props) {
  const page = useSelector((state) => state.componentsInfo);
  const dispatch = useDispatch();


  let gelenler;
  if (props.componentID) {
    page
      .filter((card, i) => card.id === props.componentID)
      .map((item, id) => {
        gelenler = item;
      });
    /* console.log("___");
    console.log(props.componentID);
    console.log(gelenler);
    console.log("___");
    */
  } else {
    gelenler = { componentName: null };
  }


  //sürüklenip bırakılan itemleri reduxa geç
  const addItem = (id) => {
    dispatch({
      type: "ATTACH_COMP_TO_COL",
      payload: {
        id: id,
        colID: props.colID,
        rowID: props.rowID,
      },
    });
  };


  const [{ background }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => addItem(item.id),
    collect: (monitor) => ({
      background: monitor.isOver() ? "yellow" : "white",
    }),
  });

  //component yaratmalar burada olacak

  switch (gelenler.componentName) {
    case "content":
      return (
        <Container
          ref={drop}
          className="rounded border border-dark h-100 d-inline-block"
          style={{ background }}
        >
          {props.componentID ? (
            <MyCard key={props.componentID} id={props.componentID} />
          ) : (
            ""
          )}
        </Container>
      );

    case "carousel":
      return (
        <Container
          ref={drop}
          className="rounded border border-dark h-100 d-inline-block"
          style={{ background }}
        >
          {props.componentID ? (
            <Carousel key={props.componentID} id={props.componentID} />
          ) : (
            ""
          )}
        </Container>
      );

    case "menu":
      return (
        <Container
          ref={drop}
          className="rounded border border-dark h-100 d-inline-block"
          style={{ background }}
        >
          {props.componentID ? (
            <MyCard key={props.componentID} id={props.componentID} />
          ) : (
            ""
          )}
        </Container>
      );

    default:
      return (
        <Container
          ref={drop}
          className="rounded border border-dark h-100 d-inline-block"
          style={{ background }}
        ></Container>
      );
  }
}
