import React, { useEffect } from "react";

import { Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import ContentArea from "../../Components/ContentArea";

import ComponentArea from "./ComponentArea";

// bu sayfa sürükle bırak için alt bileşenleri düzenleyeceğimiz sayfadır.

export default function DragDropArea() {
  const page = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/components", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "GET_COMPONENTS", payload: data });
      })
      .catch((err) => {
        return err;
      });
  });

  console.log(page.selectedPage);

  if (page.selectedPage !== "")
    return (
      <Container>
        <Row>
          <Col md={10} bg="primary">
            İçerik alanı
            <ContentArea></ContentArea>
          </Col>

          <Col md={2} bg="primary">
            <ComponentArea />
          </Col>
        </Row>
      </Container>
    );

  return null;
}
