import React from "react";
import UserInfo from "../component/sections/user/Info";
import middleware from "./middlewares/middleware";

const userRoutes = [
  {
    path: "/user/info",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <UserInfo />,
        "UserInfo"
      );
    },
    exact: true,
  },
   
];

export default userRoutes;
