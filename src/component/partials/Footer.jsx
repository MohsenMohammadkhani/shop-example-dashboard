import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const listRouteComponentToHide = ["/", "/auth/login-with-sms-code"];

function ComponentToHide(props) {
  const { location } = props;

  if (listRouteComponentToHide.includes(location.pathname)) {
    return null;
  }

  return <Footer />;
}

function Footer() {
  return (
    <footer className="main-footer text-center">
      <p className="m-0">
        ۱۴۰۲ - کلیه حقوق متعلق به شرکت  x است.
      </p>
    </footer>
  );
}

const ComponentThatHides = withRouter(ComponentToHide);
export default ComponentThatHides;
