import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function UserMenu({ openItem = null, activeItem = null }) {
  return (
    <li className="nav-item has-treeview">
      <Link
        to="/user/info"
        className={`nav-link  
          ${activeItem === "user-info" && "active"}`}
      >
        <i class="fas fa-info nav-icon"></i>
        <p>اطلاعات کاربری</p>
      </Link>
    </li>
  );
}
