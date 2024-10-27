import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function OrderMenu({ openItem = null, activeItem = null }) {
  return (
    <li className="nav-item">
      <Link
        to="/order/all"
        className={`nav-link d-flex
          ${activeItem === "customer-order" && "active"}`}
      >
        <i class="nav-icon fas fa-shopping-cart"></i>
        <p>سفارش های شما</p>
      </Link>
    </li>
  );
}
