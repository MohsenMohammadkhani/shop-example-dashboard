import React from "react";
import authRoutes from "./auth";
import permissionRoutes from "./permission";
import roleRoutes from "./role";
import productRoutes from "./product";
import NotFounded from "../component/partials/other/NotFounded";

const routes = [
  ...authRoutes,
  ...permissionRoutes,
  ...roleRoutes,
  ...productRoutes,
  {
    path: "*",
    render: () => <NotFounded />,
    exact: true,
  },
];

export default routes;
