import React, { useState, useEffect } from "react";
import { FaTools, FaTrash } from "react-icons/fa";

import { produce } from "immer";
import uuid from "uuid";

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";

export default function AddMenuArea() {
  const [proccess, setProccess] = useState("");
  const [linkid, setLinkID] = useState(0);
  const [sublinkid, setsubLinkID] = useState(0);

  const [modalShow, setModalShow] = useState(false);

  const [menu, setMenu] = useState({
    id: "",
    menuHeader: "",
    links: [],
  });

  const [menus, setMenus] = useState([]);

  const saveMenu = () => {
    fetch("http://localhost:3000/api/menu/add", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((response) => response.json())
      .then((data) => alert(data))
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteMenu = (_id) => {
    fetch("http://localhost:3000/api/menu/delete", {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NWYwYWVmNDZkNDIxMGYxZDBjMDY3MWY2.KVN9LD_ZWmQ5I6x0c1UyiPK8HqyURrNlPN48bjYEBxg",
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        getAllMenus();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllMenus();
  }, [menu]);


  
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
        setMenus(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createMenu = (obj) => {
    setMenu(
      produce((draft) => {
        draft.menuHeader = "menuHeader";
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

  /*
  index
  linkName
  target
  */
  const updateLink = (obj) => {
    setMenu(
      produce((draft) => {
        draft.links[obj.index].linkName = obj.linkName;
        draft.links[obj.index].target = obj.target;
      })
    );
  };

  /*
  index
  subindex
  linkName
  target
  */
  const updateSubLink = (obj) => {
    setMenu(
      produce((draft) => {
        draft.links[obj.index].sublink[obj.subindex].linkName = obj.linkName;
        draft.links[obj.index].sublink[obj.subindex].target = obj.target;
      })
    );
  };

  const deleteLink = (obj) => {
    setMenu(
      produce((draft) => {
        draft.links.splice(obj.index, 1);
      })
    );
  };

  const deleteSubLink = (obj) => {
    setMenu(
      produce((draft) => {
        draft.links[obj.index].sublink.splice(obj.subindex, 1);
      })
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            {" "}
            <Button onClick={() => createMenu()}>Menü Oluştur</Button>
          </Col>
          <Col>
            {menu.id !== "" ? (
              <Button
                onClick={() => {
                  setProccess("createLink");
                  setModalShow(!modalShow);
                }}
              >
                Link Ekle
              </Button>
            ) : (
              ""
            )}
          </Col>
          <Col>
            <Button onClick={() => saveMenu()}>Kaydet</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="block-example border border-dark">
              {menu.links.map((item, index) => (
                <Row>
                  <Col md="10">
                    {item.linkName} ... {item.target}
                  </Col>
                  <Col md="2">
                    {/* add button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setLinkID(index);
                        setProccess("createSubLink");
                        setModalShow(!modalShow);
                      }}
                    >
                      +
                    </Button>
                    {/* update button */}
                    <Button
                      onClick={() => {
                        setLinkID(index);
                        setProccess("updateLink");
                        setModalShow(!modalShow);
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      <FaTools />
                    </Button>
                    {/* delete button */}
                    <Button
                      onClick={() => deleteLink({ index: index })}
                      variant="secondary"
                      size="sm"
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                  {item.sublink.map((subarr, subarrindex) => (
                    <Col md={12}>
                      <Row>
                        <Col md={{ offset: 2, span: 8 }}>
                          {subarr.linkName} ... {subarr.target}
                        </Col>
                        <Col md={2}>
                          {/* settings button */}
                          <Button
                            onClick={() => {
                              setLinkID(index);
                              setsubLinkID(subarrindex);
                              setProccess("updateSubLink");
                              setModalShow(!modalShow);
                            }}
                            variant="secondary"
                            size="sm"
                          >
                            <FaTools />
                          </Button>
                          {/* delete button */}
                          <Button
                            onClick={() =>
                              deleteSubLink({
                                index: index,
                                subindex: subarrindex,
                              })
                            }
                            variant="secondary"
                            size="sm"
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="block-example border border-dark">
              {menus.map((item, id) => (
                <Row key={id}>
                  <Col key={id}>
                    <Button
                      onClick={() => setMenu(item)}
                      variant="secondary"
                      size="sm"
                    >
                      <FaTools />
                    </Button>
                    <Button
                      onClick={() => deleteMenu(item.id)}
                      variant="secondary"
                      size="sm"
                    >
                      <FaTrash />
                    </Button>
                    {item.links[0].linkName} .{item.links[0].target}
                  </Col>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        addlink={(obj) => createLink(obj)}
        addsublink={(obj) => createSubLink(obj)}
        updatelink={(obj) => updateLink(obj)}
        updatesublink={(obj) => updateSubLink(obj)}
        linkid={linkid}
        sublinkid={sublinkid}
        data={proccess}
      />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const [target, setTarget] = useState("");
  const [linkName, setLinkName] = useState("");

  /**
   * iki modlu çalışacak, kaydet ve update
   * eğer props data boşsa kaydet gibi davranacak dolu ise update
   */

  useEffect(() => {
    if (props.data === "createLink") {
      console.log("link oluşturulacak");
    }

    if (props.data === "createSubLink") {
      console.log("sublink oluşturulacak");
    }

    if (props.data === "updateLink") {
      console.log("update link oldu");
    }

    if (props.data === "updateSubLink") {
      console.log("update sublink oldu");
    }
  }, [props.data]);

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
              Link Adı
            </Form.Label>
            <Col>
              <Form.Control
                onChange={(e) => setLinkName(e.target.value)}
                type="text"
                placeholder="Link Adı"
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column lg={2}>
              Hedef
            </Form.Label>

            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Hedef"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setTarget(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Form.Row>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button
            variant="primary"
            onClick={() => {
              if (props.data === "createLink") {
                props.addlink({ linkName: linkName, target: target });
              }

              if (props.data === "createSubLink") {
                props.addsublink({
                  linkName: linkName,
                  target: target,
                  index: props.linkid,
                });
              }

              if (props.data === "updateLink") {
                props.updatelink({
                  linkName: linkName,
                  target: target,
                  index: props.linkid,
                });
              }

              if (props.data === "updateSubLink") {
                props.updatesublink({
                  linkName: linkName,
                  target: target,
                  subindex: props.sublinkid,
                  index: props.linkid,
                });
              }

              props.onHide();
            }}
          >
            Kaydet
          </Button>{" "}
        </>
      </Modal.Footer>
    </Modal>
  );
}
