import React from "react";
import Payment from "../component/sections/payment/All";
import middleware from "./middlewares/middleware";

const paymentRoutes = [
  {
    path: "/payment/all",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <Payment />,
        "Payment"
      );
    },
    exact: true,
  },
   
];

export default paymentRoutes;
