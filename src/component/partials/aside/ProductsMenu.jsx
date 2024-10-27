import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function ProductsMenu({ openItem = null, activeItem = null }) {
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
       ${openItem === "products" && "menu-open"}`}
        >
          <a
            href="#"
            className={`nav-link  
          ${openItem === "products" && "active"}`}
          >
            <i className="nav-icon far fa-hand-rock"></i>
            <p>
              محصول ها
              <i className="right fa fa-angle-left"></i>
            </p>
          </a>
          <ul className="nav nav-treeview">
            {/* <li className="nav-item">
              <Link
                to="/product/all"
                className={`nav-link  
            ${activeItem === "all" && "active"}`}
              >
                <i className="fa fa-list nav-icon"></i>
                <p>همه محصول ها</p>
              </Link>
            </li> */}

            <li className="nav-item">
              <Link
                to="/product/all"
                className={`nav-link  
             ${activeItem === "all" && "active"}`}
              >
                <i className="fa fa-list nav-icon"></i>
                <p>همه محصول ها</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/product/add"
                className={`nav-link  
             ${activeItem === "add" && "active"}`}
              >
                <i className="fa fa-list nav-icon"></i>
                <p>اضافه کردن محصول</p>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
