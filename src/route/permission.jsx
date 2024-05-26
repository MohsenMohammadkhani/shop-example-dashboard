import React from "react";
import AllPermission from "../component/sections/permission/All";
import AddPermission from "../component/sections/permission/Add";
import EditPermission from "../component/sections/permission/Edit";
import middleware from "./middlewares/middleware";

const permissionRoutes = [
  {
    path: "/permission/all",
    // render: () => <AllPermission />,
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <AllPermission />,
        "AllPermission"
      );
    },
    exact: true,
  },
  {
    path: "/permission/add",
    // render: () => <AddPermission />,
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <AddPermission />,
        "AddPermission"
      );
    },
    exact: true,
  },
  {
    path: "/permission/edit/:permissionID",
    // render: () => <EditPermission />,
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <EditPermission />,
        "EditPermission"
      );
    },
    exact: true,
  },
];

export default permissionRoutes;
