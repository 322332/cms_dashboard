import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import uuid from "uuid";

import { FaTrash, FaWrench } from "react-icons/fa";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import request from "../../Api/Api";

export default function ContentCRUD() {
  const [modalShow, setModalShow] = React.useState(false);
  const [updateID, setUpdateID] = useState("");

  const [contents, setContents] = useState([]);

  const getAllContents = () => {
    fetch("http://127.0.0.1:3000/api/content/getAll", {
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
        setContents(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteContent = (id) => {
    fetch("http://127.0.0.1:3000/api/content/delete", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        getAllContents();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllContents();
  }, []);

  return (
    <Container>
      <Row>
        <Col>İçerik Ekranı</Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={() => {
              setUpdateID("");
              setModalShow(true);
            }}
          >
            Ekle
          </Button>
        </Col>
      </Row>

      <Row></Row>

      {/** list contents */}
      <br></br>
      <br></br>
      {contents.map((item) => (
        <Row>
          <Col md={10}>{item.title}</Col>
          <Col md={2}>
            <Button
              onClick={() => {
                setUpdateID(item.id);

                setModalShow(true);
              }}
              variant="secondary"
              size="sm"
            >
              <FaWrench />
            </Button>
            <Button
              onClick={() => deleteContent(item.id)}
              variant="secondary"
              size="sm"
            >
              <FaTrash />
            </Button>
          </Col>
        </Row>
      ))}

      {/** list contents */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        getallcontents={() => getAllContents()}
        updateid={updateID}
      />
    </Container>
  );
}

function MyVerticallyCenteredModal(props) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  async function addContent() {
    const res = await request("content/add", {
      id: uuid(),
      componentName: "content",
      title: title,
      content: value,
    });

    alert(res);
    props.getallcontents();
  }

  useEffect(() => {
    console.log(props.updateid);
  }, [props.updateid]);

  const updateContent = (id) => {
    fetch("http://127.0.0.1:3000/api/content/add", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        componentName: "content",
        title: title,
        content: value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.getallcontents();
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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br></br>

        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Başlık
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </InputGroup>

        <br></br>
        <CKEditor
          editor={ClassicEditor}
          data=" "
          onInit={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();

            setValue(data);
          }}
        />
        <Col>
          <Button
            onClick={() => {
              if (props.updateid === "") {
                addContent();
              } else {
                updateContent(props.updateid);
              }
              props.onHide();
            }}
          >
            Kaydet
          </Button>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
