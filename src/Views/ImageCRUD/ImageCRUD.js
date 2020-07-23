import React, { useState, useEffect } from "react";
import uuid from "uuid";
import { FaTrash } from "react-icons/fa";

import { Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap";

export default function ImageCRUD() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;

    const formData = new FormData();
    formData.append("id", uuid());
    const arr = [...files];

    arr.map((item) => {
      formData.append("myFile", item);
    });

    fetch("http://127.0.0.1:3000/api/image/add", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        getAllImages();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllImages = () => {
    fetch("http://127.0.0.1:3000/api/image/getAll", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteImages = (id) => {
    fetch("http://127.0.0.1:3000/api/image/delete", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        getAllImages();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <input
            type="file"
            name="avatar"
            multiple
            onChange={handleImageUpload}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {images.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md="10">
                    <Image
                      key={item._id}
                      src={"http://127.0.0.1:3000" + item.src}
                      style={{ width: "200px", height: "150px" }}
                    />
                  </Col>
                  <Col md="2">
                    {" "}
                    <Button
                      onClick={() => deleteImages(item.id)}
                      variant="secondary"
                      size="sm"
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
