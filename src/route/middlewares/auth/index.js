import React from "react";
import CryptoJS from "crypto-js";
import { Redirect } from "react-router-dom";
import store from "../../../store/index";
import authorizedComponent from "./authorized-component";

const checkUserPermissions = (component, componentName) => {
  const mainStore = store.getState().auth;
  if (
    !authorizedComponent.isUserHasPermission(
      componentName,
      mainStore.permissionsUser
    )
  ) {
    return {
      status: false,
      routeObject: <Redirect to="/unauthorized" />,
    };
  }

  return {
    status: true,
    routeObject: component,
  };
};
 
const hasToken = (component) => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  if (token == null) {
    return {
      status: false,
      routeObject: <Redirect to="/login" />,
    };
  }

  if (token == "") {
    return {
      status: false,
      routeObject: <Redirect to="/login" />,
    };
  }

  return {
    status: true,
    routeObject: component,
  };
};

const isUserFillInfo = (component) => {
  const mainStore = store.getState().auth;
  if (
    mainStore.firstnameUser == null ||
    mainStore.lastnameUser == null ||
    mainStore.categoryUser == null
  ) {
    return {
      status: false,
      routeObject: <Redirect to="/user/info" />,
    };
  }

  return {
    status: true,
    routeObject: component,
  };
};

const isUserLogin = (component) => {
  const mainStore = store.getState().auth;

  if (!mainStore.isUserLoggedIn) {
    return {
      status: false,
      routeObject: <Redirect to="/auth/login-with-sms-code" />,
    };
  }

  return {
    status: true,
    routeObject: component,
  };
};

const isUserLogout = (component) => {
  const mainStore = store.getState().auth;

  if (mainStore.isUserLoggedIn) {
    return {
      status: false,
      routeObject: <Redirect to="/" />,
    };
  }

  return {
    status: true,
    routeObject: component,
  };
};

export default {
  checkUserPermissions,
  hasToken,
  isUserFillInfo,
  isUserLogin,
  isUserLogout,
};
