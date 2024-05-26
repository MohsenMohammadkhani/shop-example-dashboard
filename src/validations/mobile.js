import validator from "validator";
import message from "../messages/auth";

const validateMobile = (mobile) => {
  if (validator.isEmpty(mobile)) {
    return {
      result: false,
      message: message.USER_MOBILE_DOSE_NOT_EXIST,
    };
  }

  if (!mobile.trim().length) {
    return {
      result: false,
      message: message.USER_MOBILE_DOSE_NOT_EXIST,
    };
  }

  if (!isNumericMobile(mobile)) {
    return {
      result: false,
      message: message.USER_MOBILE_WRONG,
    };
  }

  if (!validMobileNumber(mobile)) {
    return {
      result: false,
      message: message.USER_MOBILE_WRONG,
    };
  }

  if (!lengthMobileNumber(mobile)) {
    return {
      result: false,
      message: message.USER_MOBILE_WRONG,
    };
  }

  return {
    result: true,
  };
};

const isNumericMobile = (mobile) => {
  if (!isNaN(mobile)) {
    return true;
  }
  return false;
};

const validMobileNumber = (mobile) => {
  if (mobile.charAt(0) == "0" && mobile.charAt(1) == "9") {
    return true;
  }
  return false;
};

const lengthMobileNumber = (mobile) => {
  if (mobile.length == 11) {
    return true;
  }
  return false;
};

export default validateMobile;
