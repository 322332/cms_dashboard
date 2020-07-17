import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function PageCRUD() {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPageNames();
  }, []);

  return (
    <ListGroup>
      {pages.map((item) => (
        <ListGroup.Item>
          <Link
            to="/drag"
            onClick={() => {
              dispatch({ type: "SET_SELECTEDPAGE", selectedPage: item });
            }}
          >
            {" "}
            {item}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
