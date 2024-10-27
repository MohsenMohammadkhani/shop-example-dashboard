import React from "react";
import authRoutes from "./auth";
import permissionRoutes from "./permission";
import roleRoutes from "./role";
import productRoutes from "./product";
import NotFounded from "../component/partials/other/NotFounded";
import Welcome from "../component/sections/welcome";
import orderRoutes from "./order";
import paymentRoutes from "./payment";
import userRoutes from "./user";
import middleware from "./middlewares/middleware";

const routes = [
  {
    path: "/",
    render: () => {
      return middleware(["isUserLogin"], <Welcome />, "UnAuthorized");
    },
    exact: true,
  },
  ...authRoutes,
  ...permissionRoutes,
  ...roleRoutes,
  ...productRoutes,
  ...orderRoutes,
  ...paymentRoutes,
  ...userRoutes,
  {
    path: "/not-founded",
    render: () => <NotFounded />,
    exact: true,
  },
  {
    path: "*",
    render: () => {
      window.location.replace("/not-founded");
    },
    exact: true,
  },
];

export default routes;
