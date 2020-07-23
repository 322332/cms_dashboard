import React, { useEffect, useState } from "react";

import { Container, Row, Card, Col } from "react-bootstrap";
import { produce } from "immer";
export default function DashBoard() {
  const [it, setIt] = useState({
    carouselSize: 0,
    contentSize: 0,
    imageSize: 0,
    menuSize: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/dashboard", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },

      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setIt(
          produce((draft) => {
            console.log(draft.carouselSize);
            draft.carouselSize = data.carouselSize;
            draft.imageSize = data.imageSize;
            draft.contentSize = data.contentSize;
            draft.menuSize = data.menuSize;
          })
        );
        console.log(it);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container>
      <Row>
        <h1>Hoşgeldiniz</h1>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: "15rem" }}>
            <Card.Body>
              <Card.Title>Slider</Card.Title>
              <Card.Text>Toplam Slider sayısı :{it.carouselSize} </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "15rem" }}>
            <Card.Body>
              <Card.Title>Menü</Card.Title>
              <Card.Text>Toplam Menü sayısı :{it.menuSize}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "15rem" }}>
            <Card.Body>
              <Card.Title>İçerik</Card.Title>
              <Card.Text>Toplam İçerik sayısı :{it.contentSize}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "15rem" }}>
            <Card.Body>
              <Card.Title>Resim</Card.Title>
              <Card.Text>Toplam Resim sayısı :{it.imageSize}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
