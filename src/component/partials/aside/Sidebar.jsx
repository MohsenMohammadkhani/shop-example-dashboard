import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import sidebarHelper from "../../../helpers/sidebar";
import RolesPermissionsMenu from "./RolesPermissionsMenu";
import authorizedComponent from "../../../route/middlewares/auth/authorized-component";
import ProductsMenu from "./ProductsMenu";

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
    productsMenu = (
      <ProductsMenu openItem={openItem} activeItem={activeItem} />
    );
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 sidebar-dark-info">
      <a to="../../index3.html" className="brand-link bg-success">
        {/* <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style="opacity: .8"> */}
        <span className="brand-text font-weight-light">پنل مدیریت</span>
      </a>

      <div className="sidebar">
        <div>
          {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
            </div>
            <div className="info">
              <a to="#" className="d-block">
                حسام موسوی
              </a>
            </div>
          </div> */}

          {productsMenu}
          {rolesPermissionsMenu}
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
