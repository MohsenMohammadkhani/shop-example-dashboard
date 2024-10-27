import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import sidebarHelper from "../../../helpers/sidebar";
import RolesPermissionsMenu from "./RolesPermissionsMenu";
import authorizedComponent from "../../../route/middlewares/auth/authorized-component";
import ProductsMenu from "./ProductsMenu";
import OrderMenu from "./OrderMenu";
import PaymentMenu from "./PaymentMenu";
import UserMenu from "./UserMenu";

function Sidebar({ openItem = null, activeItem = null, permissionsUser }) {
  let rolesPermissionsMenu = "";
  if (
    authorizedComponent.isUserHasPermissionTreeMenu(
      authorizedComponent.listPermissionMenu.ROLE_PERMISSION_MENU,
      permissionsUser
    )
  ) {
    rolesPermissionsMenu = (
      <RolesPermissionsMenu openItem={openItem} activeItem={activeItem} />
    );
  }


  let productsMenu = "";
  if (
    authorizedComponent.isUserHasPermissionTreeMenu(
      authorizedComponent.listPermissionMenu.PRODUCTS_MENU,
      permissionsUser
    )
  ) {
    productsMenu = <ProductsMenu openItem={openItem} activeItem={activeItem} />;
  }

  let orderMenu = "";
  if (
    authorizedComponent.isUserHasPermissionTreeMenu(
      authorizedComponent.listPermissionMenu.ORDER_MENU,
      permissionsUser
    )
  ) {
    orderMenu = <OrderMenu openItem={openItem} activeItem={activeItem} />;
  }

  let paymentMenu = "";
  if (
    authorizedComponent.isUserHasPermissionTreeMenu(
      authorizedComponent.listPermissionMenu.PAYMENT_MENU,
      permissionsUser
    )
  ) {
    paymentMenu = <PaymentMenu openItem={openItem} activeItem={activeItem} />;
  }

  let userMenu = "";
  if (
    authorizedComponent.isUserHasPermissionTreeMenu(
      authorizedComponent.listPermissionMenu.USER_MENU,
      permissionsUser
    )
  ) {
    userMenu = <UserMenu openItem={openItem} activeItem={activeItem} />;
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 sidebar-dark-info">
      <a to="../../index3.html" className="brand-link bg-success">
        <span className="brand-text font-weight-light">پنل مدیریت</span>
      </a>

      <div className="sidebar">
        <div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item has-treeview">
                <Link
                  to="/"
                  className={`nav-link  
            ${activeItem === "welcome" && "active"}`}
                >
                  <i className="fa fa-list nav-icon"></i>
                  <p>داشبورد</p>
                </Link>
              </li>

              {productsMenu}
              {rolesPermissionsMenu}

              {orderMenu}
              {paymentMenu}
              {userMenu}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}

const mapStateToProps = (state) => {
  return {
    permissionsUser: state.auth.permissionsUser,
  };
};

const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
