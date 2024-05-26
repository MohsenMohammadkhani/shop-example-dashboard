import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const listRouteComponentToHide = [
  "/",
  "/auth/login-with-sms-code",
];

function ComponentToHide(props) {
  const { location } = props;

  if (listRouteComponentToHide.includes(location.pathname)) {
    return null;
  }
   
  return <Nav />;
}

function Nav() {
  return (
    <nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom navbar-dark bg-success">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <span
            className="nav-link p-0 position-relative btn btn-power-off"
            onClick={() => {
              const result = window.confirm(
                "آیا قصد خروج از داشبورد را دارید."
              );
              if (!result) {
                return;
              }

              localStorage.removeItem("token");
              window.location = "/";
            }}
          >
            <i className="fa fa-power-off"></i>
          </span>
        </li>
      </ul>
    </nav>
  );
}

const ComponentThatHides = withRouter(ComponentToHide);
export default ComponentThatHides;
