import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  Toast,
  InputGroup,
} from "react-bootstrap";
import uuid from "uuid";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import request from "../../Api/Api";

export default function ContentCRUD() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const [response, setResponse] = useState("");

  async function errorResponse() {
    const res = await request("content/add", {
      id: uuid(),
      componentName: "content",
      title: title,
      subtitle: "altbaşlık",
      content: value,
    });

    setResponse(res);
    setShow(true);
  }

  return (
    <Container>
      {/*server response mesajı */}
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Server Response</strong>
        </Toast.Header>
        <Toast.Body>{response}</Toast.Body>
      </Toast>
      {/*server response mesajı */}
      <Row>
        <Col>İçerik Ekranı</Col>
      </Row>
      <Row>
        <Col>
          <br></br>
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
          <br></br>
          <CKEditor
            editor={ClassicEditor}
            data=" "
            onInit={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log(data);
              setValue(data);
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            onClick={() => {
              errorResponse();
            }}
          >
            Kaydet
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
