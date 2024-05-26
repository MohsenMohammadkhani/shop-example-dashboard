import authActions from "../actions/auth";

const mainState = {
  authStatus: null,
  isUserLoggedIn: false,
  isInit: false,

  roleUser: null,
  permissionsUser: null,
};

const main = (state = mainState, action) => {
  let newState = state;

  switch (action.type) {
    case authActions.MOBILE_USER_WRONG:
      newState = {
        ...state,
        hasMessage: true,
        typeMessage: action.payload.typeMessage,
        message: action.payload.message,
      };
      break;

    case authActions.CHECK_USER_LOGIN_SUCCESS:
      newState = {
        ...state,
        isInit: true,
        isUserLoggedIn: true,
        roleUser: action.payload.role,
        permissionsUser: action.payload.permissions,
        userID: action.payload.user_id,
        mobileNumber: action.payload.user_mobile_number,
      };
      break;

    case authActions.CHECK_USER_LOGIN_FAILED:
      newState = {
        ...state,
        isInit: true,
      };
      break;
  }
  return newState;
};

export default main;
