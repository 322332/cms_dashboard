import React, { useState } from "react";

import { produce } from "immer";
import uuid from "uuid";

import { Container, Row, Col, Button } from "react-bootstrap";

export default function AddMenuArea() {
  const [menu, setMenu] = useState({
    id: "",
    menuHeader: "",
    links: [],
  });

  const getAllMenus = () => {
    fetch("http://127.0.0.1:3000/api/menu/getAll", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createMenu = (obj) => {
    setMenu(
      produce((draft) => {
        draft.menuHeader = "kamil";
        draft.id = uuid();
      })
    );
  };

  const createLink = (obj) => {
    setMenu(
      produce((draft) => {
        draft.links.push({
          id: uuid(),
          linkName: obj.linkName,
          target: obj.target,
          sublink: [],
        });
      })
    );
  };

  const createSubLink = (obj) => {
    setMenu(
      produce((draft) => {
        draft.links[obj.index].sublink.push({
          id: uuid(),
          linkName: obj.linkName,
          target: obj.target,
        });
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          {" "}
          <Button onClick={() => createMenu()}>Menü Oluştur</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                {menu.id !== "" ? (
                  <Button
                    onClick={() =>
                      createLink({ linkName: "isim", target: "hedef" })
                    }
                  >
                    Link Ekle
                  </Button>
                ) : (
                  ""
                )}
              </Col>
              <Col>
                {menu.links.map((item, index) => (
                  <div key={item.id}>
                    {item.id}
                    <Button
                      onClick={() =>
                        createSubLink({
                          index,
                          linkName: "bubilink",
                          target: "target",
                        })
                      }
                    >
                      sublink add
                    </Button>
                    {item.sublink.map((subarr) => (
                      <div key={subarr.id}>{subarr.id}</div>
                    ))}
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
