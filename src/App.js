import React, { useEffect } from "react";

import { TheLayout } from "./Containers";

import { HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
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
}

export default App;
