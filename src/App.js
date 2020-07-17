import React from "react";

import { TheLayout } from "./Containers";

import { HashRouter, Route, Switch } from "react-router-dom";

function App() {
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
