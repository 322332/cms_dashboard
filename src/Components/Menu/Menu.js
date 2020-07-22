import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Menu(props) {
  const page = useSelector((state) => state.componentsInfo);

  let gelenler;
  page
    .filter((card, i) => card.id === props.id)
    .map((item, id) => {
      gelenler = item;
    });

  if (gelenler !== undefined)
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home">CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {gelenler.links.map((item, id) =>
              item.sublink.length === 0 ? (
                <Nav.Link href="#features">{item.linkName}</Nav.Link>
              ) : (
                <NavDropdown title={item.linkName} id="collasible-nav-dropdown">
                  {item.sublink.map((subitem) => (
                    <NavDropdown.Item href="#action/3.1">
                      {subitem.linkName}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              )
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

  return <div>this component deleted</div>;
}
