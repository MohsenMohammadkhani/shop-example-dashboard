import { takeLatest, put, call } from "redux-saga/effects";
import authActions from "../actions/auth";
import HttpHelper from "../../helpers/http";

const checkUserLoginWorker = function* () {
  try {
    const result = yield call(() => {
      const url = process.env.REACT_APP_DOMAIN_API + "/api/v1/dashboard/auth/init";
      const token = localStorage.getItem("token");
      
      const headersRequest = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
     
      return HttpHelper.getRequest(url, headersRequest);
    });
 
    yield put({
      type: authActions.CHECK_USER_LOGIN_SUCCESS,
      payload: result.data.data,
    });
  } catch (error) {
    yield put({
      type: authActions.CHECK_USER_LOGIN_FAILED,
      payload: null,
    });
  }
};

export const checkUserLoginWatcher = function* () {
  yield takeLatest(authActions.CHECK_USER_LOGIN, checkUserLoginWorker);
};
