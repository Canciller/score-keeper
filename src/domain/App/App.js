import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "domain/Layout";
import { AuthProvider } from "context/AuthContext";
import routes from "config/routes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
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
    </SnackbarProvider>
  );
}

export default App;
