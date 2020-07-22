import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Menu2(props) {
  const page = useSelector((state) => state.componentsInfo);

  let gelenler;
  page
    .filter((card, i) => card.id === props.id)
    .map((item, id) => {
      gelenler = item;
    });
  console.log(gelenler);

  if (gelenler !== undefined)
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title={gelenler.links[0].linkName}
              id="collasible-nav-dropdown"
            >
              {gelenler.links.map((item, id) => (
                <NavDropdown.Item href="#action/3.1">
                  {item.linkName}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

  return "Component's content not found";
}
