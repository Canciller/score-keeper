import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "domain/Layout";
import { AuthProvider } from "context/AuthContext";
import routes from "config/routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} exact {...route} />
            ))}
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
