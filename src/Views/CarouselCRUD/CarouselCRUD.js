import React, { useState, useEffect } from "react";
import uuid from "uuid";
import { FaTrash } from "react-icons/fa";

import { Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap";

export default function CarouselCRUD() {
  const [carousels, setCarousels] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;

    const formData = new FormData();
    formData.append("id", uuid());
    const arr = [...files];

    arr.map((item) => {
      formData.append("myFile", item);
    });

    fetch("http://127.0.0.1:3000/api/carousel/add", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        getAllCarousels();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllCarousels = () => {
    fetch("http://127.0.0.1:3000/api/carousel/getAll", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCarousels(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteCarousels = (id) => {
    fetch("http://127.0.0.1:3000/api/carousel/delete", {
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
        getAllCarousels();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllCarousels();
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
            {carousels.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md="10">
                    {item.items.map((img) => (
                      <Image
                        key={img._id}
                        src={"http://127.0.0.1:3000" + img.src}
                        style={{ width: "200px", height: "150px" }}
                      />
                    ))}
                  </Col>
                  <Col md="2">
                    {" "}
                    <Button
                      onClick={() => deleteCarousels(item.id)}
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
