import validator from "validator";
import message from "../../messages/permission";

const validateName = (name) => {
  if (validator.isEmpty(name)) {
    return message.NAME_DOSE_NOT_EXIST;
  }

  if (!name.trim().length) {
    return message.NAME_DOSE_NOT_EXIST;
  }

  const regexJustEnglishAndNumber = /^[-A-Za-z0-9]*$/;
  if (!regexJustEnglishAndNumber.test(name)) {
    return message.NAME_DOSE_INVALID;
  }

  return true;
};

const validatePersianName = (persianName) => {
  if (validator.isEmpty(persianName)) {
    return message.PERSIAN_NAME_DOSE_NOT_EXIST;
  }

  if (!persianName.trim().length) {
    return message.PERSIAN_NAME_DOSE_NOT_EXIST;
  }

  return true;
};

const validateFormPermission = (info) => {
  const resValidateName = validateName(info.name);
  if (resValidateName != true) {
    return resValidateName;
  }

  const resValidatePersianName = validatePersianName(info.persian_name);
  if (resValidatePersianName != true) {
    return resValidatePersianName;
  }

  return true;
};

export default validateFormPermission;
