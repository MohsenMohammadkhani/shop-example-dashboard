import React from "react";
import LoginWithMobileNumber from "../component/sections/auth/LoginWithMobileNumber";
import middleware from "./middlewares/middleware";
import UnAuthorized from "../component/partials/other/UnAuthorized";

const authRoutes = [
  {
    path: "/auth/login-with-sms-code",
    render: () => {
      return middleware(
        ["isUserLogout"],
        <LoginWithMobileNumber />,
        "LoginWithMobileNumber"
      );
    },
    exact: true,
  },
  {
    path: "/unauthorized",
    render: () => {
      return middleware(["isUserLogin"], <UnAuthorized />, "UnAuthorized");
    },
    exact: true,
  },
];

export default authRoutes;
