import validator from "validator";
import message from "../../messages/product";

const validateTitle = (title) => {
  if (validator.isEmpty(title)) {
    return message.TITLE_DOSE_NOT_EXIST;
  }

  if (!title.trim().length) {
    return message.TITLE_INVALID;
  }

  return true;
};

const validateSlug = (slug) => {
  if (validator.isEmpty(slug)) {
    return message.SLUG_DOSE_NOT_EXIST;
  }

  if (!slug.trim().length) {
    return message.SLUG_INVALID;
  }
  const regexJustEnglishChartersAndNumberAndDash = /^[-A-Za-z0-9]*$/;
  if (!regexJustEnglishChartersAndNumberAndDash.test(slug)) {
    return message.SLUG_INVALID;
  }

  return true;
};

const validatePrice = (price) => {
  if (validator.isEmpty(price)) {
    return message.PRICE_DOSE_NOT_EXIST;
  }

  if (!validator.isNumeric(price)) {
    return message.PRICE_INVALID;
  }

  return true;
};

const validateDescription = (description) => {
  if (validator.isEmpty(description)) {
    return message.DESCRIPTION_DOSE_NOT_EXIST;
  }

  if (!description.trim().length) {
    return message.DESCRIPTION_INVALID;
  }

  return true;
};

const validateIsExist = (isExist) => {
  if (validator.isEmpty(isExist)) {
    return message.IS_EXIST_DOSE_NOT_EXIST;
  }

  if (!validator.isBoolean(isExist)) {
    return message.IS_EXIST_INVALID;
  }

  return true;
};

const validateCountImages = (countImages) => {
  if (validator.isEmpty(countImages)) {
    return message.COUNT_IMAGES_DOSE_NOT_EXIST;
  }

  if (!parseInt(countImages)) {
    return message.COUNT_IMAGES_INVALID;
  }

  return true;
};

const validateAttributes = (attributes) => {
  if (validator.isEmpty(attributes)) {
    return message.ATTRIBUTES_DOSE_NOT_EXIST;
  }

  if (!validator.isJSON(attributes)) {
    return message.ATTRIBUTES_INVALID;
  }

  if (!Object.keys(JSON.parse(attributes)).length) {
    return message.ATTRIBUTES_INVALID;
  }
  
  return true;
};

const validate = (info) => {
  const resultValidateTitle = validateTitle(info.title);
  if (resultValidateTitle != true) {
    return resultValidateTitle;
  }

  const resultValidateSlug = validateSlug(info.slug);
  if (resultValidateSlug != true) {
    return resultValidateSlug;
  }

  const resultValidatePrice = validatePrice(info.price);
  if (resultValidatePrice != true) {
    return resultValidatePrice;
  }

  const resultValidateDescription = validateDescription(info.description);
  if (resultValidateDescription != true) {
    return resultValidateDescription;
  }

  const resultValidateAttributes = validateAttributes(info.attributes);
  if (resultValidateAttributes != true) {
    return resultValidateAttributes;
  }

  const resultValidateIsExist = validateIsExist(info.is_exist);
  if (resultValidateIsExist != true) {
    return resultValidateIsExist;
  }

  const resultValidateCountImages = validateCountImages(info.count_images_upload);
  if (resultValidateCountImages != true) {
    return resultValidateCountImages;
  }

  return true;
};

export default validate;
