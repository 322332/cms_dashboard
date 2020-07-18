import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

import { FaTools, FaTrash } from "react-icons/fa";

import {
  ListGroup,
  Modal,
  Button,
  Form,
  Col,
  Spinner,
  InputGroup,
  FormControl,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function PageCRUD() {
  const [modalShow, setModalShow] = React.useState(false);
  const [pages, setPages] = useState([]);
  const dispatch = useDispatch();

  function fetchPageNames() {
    fetch("http://127.0.0.1:3000/api/pageLayout/getPageNames", {
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
        setPages(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPageNames();
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Yeni Sayfa Ekle
      </Button>
      <ListGroup>
        {pages.map((item) => (
          <ListGroup.Item>
            <Row>
              <Col md="10">
                <Link
                  to="/drag"
                  onClick={() => {
                    dispatch({ type: "SET_SELECTEDPAGE", selectedPage: item });
                  }}
                >
                  {" "}
                  {item}
                </Link>
              </Col>
              <Col md="2">
                <Row>
                  <Col md="4">
                  </Col>
                  <Col md="4">
                    <Button
                      onClick={() => console.log("asd")}
                      variant="secondary"
                      size="sm"
                    >
                      <FaTools />
                    </Button>
                  </Col>
                  <Col  md="4">
                    <Button
                      onClick={() => console.log("asd")}
                      variant="secondary"
                      size="sm"
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        addpage={(page) => setPages([...pages, page])}
      />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const [loading, setLoading] = useState(false);
  const [pagename, setPageName] = useState("");
  const [pagelink, setPageLink] = useState("");

  const savePage = () => {
    setLoading(!loading);
    fetch("http://127.0.0.1:3000/api/pageLayout/save", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },

      body: JSON.stringify({
        pageName: pagename,
        pageLink: "/" + pagelink,
        rows: [],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        props.onHide();
        props.addpage(pagename);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Yeni Sayfa Ekle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Row>
            <Form.Label column lg={2}>
              Sayfa Başlığı
            </Form.Label>
            <Col>
              <Form.Control
                onChange={(e) => setPageName(e.target.value)}
                type="text"
                placeholder="Sayfa Başlığı"
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column lg={2}>
              Sayfa Linki
            </Form.Label>

            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Sayfa Linki"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPageLink(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Form.Row>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button variant="primary" onClick={() => savePage()}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Ekle"
            )}
          </Button>{" "}
        </>
      </Modal.Footer>
    </Modal>
  );
}
