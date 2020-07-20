import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import uuid from "uuid";

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

  const [upPage, setUpPage] = useState();

  function deletePage(id) {
    fetch("http://127.0.0.1:3000/api/pageLayout/deletePage", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        fetchPageNames();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchPageNames() {
    fetch("http://127.0.0.1:3000/api/pageLayout/getAllPages", {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPageNames();
  }, []);

  const setPage = (obj) => {
    setModalShow(true);
    setUpPage(obj);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setPage()}>
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
                    dispatch({
                      type: "SET_SELECTEDPAGE",
                      selectedPage: item.id,
                    });
                  }}
                >
                  {" "}
                  {item.pageName}
                </Link>
              </Col>
              <Col md="2">
                <Row>
                  <Col md="4"></Col>
                  <Col md="4">
                    {/* settings button */}
                    <Button
                      onClick={() =>
                        setPage({
                          id: item.id,
                          pagename: item.pageName,
                          pagelink: item.pageLink,
                          rows: item.rows,
                        })
                      }
                      variant="secondary"
                      size="sm"
                    >
                      <FaTools />
                    </Button>
                  </Col>
                  <Col md="4">
                    {/* delete button */}
                    <Button
                      onClick={() => deletePage(item.id)}
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
        addpage={() => fetchPageNames()}
        data={upPage}
      />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const [loading, setLoading] = useState(false);
  const [pagename, setPageName] = useState("");
  const [pagelink, setPageLink] = useState("");
  const [id, setID] = useState("");
  const [rows, setRows] = useState([]);

  /**
   * iki modlu çalışacak, kaydet ve update
   * eğer props data boşsa kaydet gibi davranacak dolu ise update
   */

  useEffect(() => {
    if (props.data !== undefined) {
      setID(props.data.id);
      setPageName(props.data.pagename);
      const deletedfirstchar = props.data.pagelink.slice(
        1,
        props.data.pagelink.length
      );
      setPageLink(deletedfirstchar);
      setRows(props.data.rows);
    } else {
      setID(uuid());
      setPageName("");
      setPageLink("");
    }
  }, [props.data]);

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
        id: id,
        pageName: pagename,
        pageLink: "/" + pagelink,
        rows: rows,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        props.onHide();
        props.addpage();
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
          {props.data ? "Düzenle" : "Kaydet"}
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
                value={pagename}
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
                  value={pagelink}
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
            ) : props.data ? (
              "Düzenle"
            ) : (
              "Kaydet"
            )}
          </Button>{" "}
        </>
      </Modal.Footer>
    </Modal>
  );
}
