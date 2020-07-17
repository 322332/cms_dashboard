import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// routes config
import routes from "../routes";

export default function TheContent() {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          path={route.path}
          key={index}
          exact={route.exact}
          name={route.name}
          render={(props) => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
          )}
        />
      ))}
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );
}
