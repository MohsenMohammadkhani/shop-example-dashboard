import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function RolesPermissionsMenu({
  openItem = null,
  activeItem = null,
}) {
  return (
    <nav className="mt-2">
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        <li
          className={`nav-item has-treeview 
       ${openItem === "role-permission" && "menu-open"}`}
        >
          <a
            href="# "
            className={`nav-link  
          ${activeItem === "all-permission" && "active"}`}
          >
            <i className="nav-icon far fa-hand-rock"></i>
            <p>
              نقش ها و دسترسی ها
              <i className="right fa fa-angle-left"></i>
            </p>
          </a>
          <ul className="nav nav-treeview">
            <li className="nav-item">
              <Link
                to="/role/all"
                className={`nav-link  
            ${activeItem === "all-role" && "active"}`}
              >
                <i className="fa fa-list nav-icon"></i>
                <p>همه نقش ها</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/permission/all"
                className={`nav-link  
             ${activeItem === "all-permission" && "active"}`}
              >
                <i className="fa fa-list nav-icon"></i>
                <p>همه دسترسی ها</p>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
