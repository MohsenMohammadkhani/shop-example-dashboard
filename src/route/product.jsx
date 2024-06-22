import React from "react";
import AllProduct from "../component/sections/product/All";
import AddProduct from "../component/sections/product/Add";
import EditProduct from "../component/sections/product/Edit";
import middleware from "./middlewares/middleware";

const productRoutes = [
  {
    path: "/product/all",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <AllProduct />,
        "AllProduct"
      );
    },
    exact: true,
  },
  {
    path: "/product/add",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <AddProduct />,
        "AddProduct"
      );
    },
    exact: true,
  },
  {
    path: "/product/edit/:productID",
    render: () => {
      return middleware(
        ["isUserLogin", "checkUserPermissions"],
        <EditProduct />,
        "EditProduct"
      );
    },
    exact: true,
  },
];

export default productRoutes;
