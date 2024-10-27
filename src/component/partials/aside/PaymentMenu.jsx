import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function PaymentMenu({ openItem = null, activeItem = null }) {
  return (
    <li className="nav-item has-treeview">
      <Link
        to="/payment/all"
        className={`nav-link  
            ${activeItem === "customer-payment" && "active"}`}
      >
        <i class="nav-icon fas fa-dollar-sign"></i>
        <p>پرداخت های شما</p>
      </Link>
    </li>
  );
}
