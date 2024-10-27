import React from "react";
import AllRole from "../component/sections/role/All";
import AddRole from "../component/sections/role/Add";
import EditRole from "../component/sections/role/Edit";
import middleware from "./middlewares/middleware";

const roleRoutes = [
  {
    path: "/role/all",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <AllRole />,
        "AllRole"
      );
    },
    exact: true,
  },
  {
    path: "/role/add",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <AddRole />,
        "AddRole"
      );
    },
    exact: true,
  },
  {
    path: "/role/edit/:roleID",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <EditRole />,
        "EditRole"
      );
    },
    exact: true,
  },
];

export default roleRoutes;
