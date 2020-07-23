import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { FaTrash, FaWrench } from "react-icons/fa";

import { ItemTypes } from "../Utils/ItemTypes";

//dynamic component eklenecek
import MyCard from "./Card/MyCard";
import Carousel from "./Carousel/Carousel";
import Menu from "./Menu/Menu";
import MyImage from "./MyImage/MyImage";

export default function BoxTarget(props) {
  const page = useSelector((state) => state.componentsInfo);
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = React.useState(false);

  let gelenler;
  if (props.componentID) {
    page
      .filter((card, i) => card.id === props.componentID)
      .map((item, id) => {
        gelenler = item;
      });
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
  if (gelenler !== undefined)
    switch (gelenler.componentName) {
      case "image":
        return (
          <Container
            ref={drop}
            className="rounded border border-dark h-100 d-inline-block"
            style={{ background }}
          >
            {props.componentID ? (
              <MyImage key={props.componentID} id={props.componentID} />
            ) : (
              ""
            )}
            <Button
              onClick={() => setModalShow(!modalShow)}
              variant="secondary"
              size="sm"
            >
              <FaWrench />
            </Button>
            <Button
              onClick={() =>
                dispatch({
                  type: "DELETE_COL",
                  payload: { colID: props.colID, rowID: props.rowID },
                })
              }
              variant="secondary"
              size="sm"
            >
              <FaTrash />
            </Button>
            {/**modal */}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              rowID={props.rowID}
              colID={props.colID}
            />
            {/**modal */}
          </Container>
        );

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
            <Button
              onClick={() => setModalShow(!modalShow)}
              variant="secondary"
              size="sm"
            >
              <FaWrench />
            </Button>
            <Button
              onClick={() =>
                dispatch({
                  type: "DELETE_COL",
                  payload: { colID: props.colID, rowID: props.rowID },
                })
              }
              variant="secondary"
              size="sm"
            >
              <FaTrash />
            </Button>
            {/**modal */}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              rowID={props.rowID}
              colID={props.colID}
            />
            {/**modal */}
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
            <Button
              onClick={() => setModalShow(!modalShow)}
              variant="secondary"
              size="sm"
            >
              <FaWrench />
            </Button>
            <Button
              onClick={() =>
                dispatch({
                  type: "DELETE_COL",
                  payload: { colID: props.colID, rowID: props.rowID },
                })
              }
              variant="secondary"
              size="sm"
            >
              <FaTrash />
            </Button>
            {/**modal */}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              rowID={props.rowID}
              colID={props.colID}
            />
            {/**modal */}
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
              <Menu key={props.componentID} id={props.componentID} />
            ) : (
              ""
            )}
            <Button
              onClick={() => setModalShow(!modalShow)}
              variant="secondary"
              size="sm"
            >
              <FaWrench />
            </Button>
            <Button
              onClick={() =>
                dispatch({
                  type: "DELETE_COL",
                  payload: { colID: props.colID, rowID: props.rowID },
                })
              }
              variant="secondary"
              size="sm"
            >
              <FaTrash />
            </Button>
            {/**modal */}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              rowID={props.rowID}
              colID={props.colID}
            />
            {/**modal */}
          </Container>
        );

      default:
        return (
          <Container
            ref={drop}
            className="rounded border border-dark h-100 d-inline-block"
            style={{ background }}
          >
            <Button
              onClick={() => setModalShow(!modalShow)}
              variant="secondary"
              size="sm"
            >
              <FaWrench />
            </Button>
            <Button
              onClick={() =>
                dispatch({
                  type: "DELETE_COL",
                  payload: { colID: props.colID, rowID: props.rowID },
                })
              }
              variant="secondary"
              size="sm"
            >
              <FaTrash />
            </Button>
            {/**modal */}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              rowID={props.rowID}
              colID={props.colID}
            />
            {/**modal */}
          </Container>
        );
    }
  else {
    return (
      <Container
        ref={drop}
        className="rounded border border-dark h-100 d-inline-block"
        style={{ background }}
      >
        this component deleted
      </Container>
    );
  }
}

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const [span, setSpan] = useState("");
  const [offset, setOffset] = useState("");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Span</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Span"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setSpan(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Offset</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Offset"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setOffset(e.target.value)}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispatch({
              type: "SET_COL",
              payload: {
                colID: props.colID,
                rowID: props.rowID,
                span: span,
                offset: offset,
              },
            });
            props.onHide();
          }}
        >
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
