import React, { useEffect } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import authActions from "../../store/actions/auth";
import SplashLoginPage from "../partials/other/SplashLoginPage";

function InitDashboard({ isInit, initApp }) {
  useEffect(() => {
    initApp();
  }, []);

  return isInit ? <Dashboard /> : <SplashLoginPage />;
}

const mapStateToProps = (state) => {
  return {
    isInit: state.auth.isInit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initApp: function () {
      dispatch({
        type: authActions.CHECK_USER_LOGIN,
        payload: null,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitDashboard);
