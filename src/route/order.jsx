import React from "react";
import Order from "../component/sections/order/All";
import middleware from "./middlewares/middleware";

const orderRoutes = [
  {
    path: "/order/all",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <Order />,
        "Order"
      );
    },
    exact: true,
  },
   
];

export default orderRoutes;
