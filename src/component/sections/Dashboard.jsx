import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "../../route/routes";
import Nav from "../partials/Nav";
import Footer from "../partials/Footer";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Switch>
          {routes.map((route, item) => (
            <Route
              key={item}
              render={route.render}
              path={route.path}
              exact={route.exact}
            />
          ))}
        </Switch>
      </BrowserRouter>
      <Footer />
      <ToastContainer />
    </>
  );
}
