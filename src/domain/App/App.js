import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "domain/Layout";
import routes from "config/routes";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} exact {...route} />
          ))}
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
