import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import { TheHeader, TheContent, TheSidebar } from "./index";

export default function TheLayout() {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <TheHeader />
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <TheSidebar />
        </Col>
        <Col md={10}>
          <TheContent />
        </Col>
      </Row>
    </Container>
  );
}
