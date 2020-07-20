import React, { useState, useEffect } from "react";

import BoxTarget from "../Components/BoxTarget";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import uuid from "react-uuid";

export default function ContentArea() {
  const layout = useSelector((state) => state.pageLayout);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.app);

  console.log("fromcontentarea");
  console.log(page.selectedPage);
  console.log("fromcontentarea");
  //modal's state
  const [modalShow, setModalShow] = useState({
    status: false,
    rowID: "",
  });

  const handleClose = () =>
    setModalShow({ ...modalShow, status: false, rowID: "" });

  // kaydet
  const kaydet = async () => {
    const deneme = await fetch("http://127.0.0.1:3000/api/pageLayout/save", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
      },
      body: JSON.stringify(layout),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });

    console.log(deneme);
    alert(deneme);
  };

  //burda context geliyor
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/pageLayout/getPage", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
      },
      body: JSON.stringify({
        id: page.selectedPage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "GET_FROM_API", payload: data });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container fluid>
      {layout.pageName}
      <Button onClick={() => kaydet()}>Kaydet</Button>
      <Button
        onClick={() =>
          dispatch({
            type: "ADD_ROW",
            payload: {
              rowID: uuid(),
              cols: [],
            },
          })
        }
      >
        +
      </Button>
      <br></br> <br></br>
      {layout.rows.map((rowItem, id) => (
        <Row key={id} className="border border-warning">
          {rowItem.cols.map((item, id) => (
            <Col key={id} md={item.md}>
              <BoxTarget
                rowID={rowItem.rowID}
                colID={item.colID}
                componentID={item.componentID}
              />
            </Col>
          ))}
          <Button
            onClick={() => dispatch({ type: "ADD_COL", id: rowItem.rowID })}
          >
            +
          </Button>
          <Button
            onClick={() => dispatch({ type: "DELETE_ROW", id: rowItem.rowID })}
          >
            X
          </Button>
        </Row>
      ))}
      {/** MODAL KISMI */}
      <Modal show={modalShow.status} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalShow.rowID}</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/** MODAL KISMI */}
    </Container>
  );
}
