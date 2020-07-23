import React, { useEffect, useState } from "react";

import { TheLayout } from "./Containers";

import { HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Spinner, Button, Form, Container } from "react-bootstrap";

function App() {
  const [wait, setWait] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = () => {
    console.log("password");
    console.log(username);
    console.log(password);
    console.log("password");
    fetch("http://127.0.0.1:3000/users/signin", {
      method: "POST", // or 'PUT'
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== "user_not_found") {
          setWait(!wait);
          localStorage.setItem("auth", data);
        } else {
          alert(data);
        }
      })
      .catch((err) => {
        return err;
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const ls = localStorage.getItem("auth");

    if (ls) setWait(!wait);

    fetch("http://127.0.0.1:3000/api/components", {
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
        dispatch({ type: "GET_COMPONENTS", payload: data });
      })
      .catch((err) => {
        return err;
      });
  }, []);

  if (wait) {
    return (
      <HashRouter>
        <Switch>
          <Route
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
          />
        </Switch>
      </HashRouter>
    );
  } else
    return localStorage.getItem("auth") ? (
      <center>
        {" "}
        <Spinner animation="grow" />
      </center>
    ) : (
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => logIn()}>
            login
          </Button>
        </Form>
      </Container>
    );
}

export default App;
