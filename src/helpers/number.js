import wordifyfaPackage from "./wordifyfa";

const unitNumber = {
  THOUSAND: "هزار",
  MILLION: "میلیون",
  MILLIARD: "میلیارد",
};

const toPersianNum = (num, dontTrim) => {
  if (num == null) {
    return;
  }

  var i = 0,
    dontTrim = dontTrim || false,
    num = dontTrim ? num.toString() : num.toString().trim(),
    len = num.length,
    res = "",
    pos,
    persianNumbers =
      typeof persianNumber == "undefined"
        ? ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
        : persianNumbers;

  for (; i < len; i++)
    if ((pos = persianNumbers[num.charAt(i)])) res += pos;
    else res += num.charAt(i);

  return res;
};

const getNumberIndex = (string, index) => {
  string = reverseString(string);
  return string.charAt(index - 1);
};

const reverseString = (str) => {
  let splitString = str.split("");
  let reverseArray = splitString.reverse();
  let joinArray = reverseArray.join("");
  return joinArray;
};

const getSummaryNumberForPresent = (number) => {
  const numberLength = number.length;
  if (numberLength <= 3) {
    return number;
  }
  const restDivision = numberLength % 3;
  let summaryNumber = "";
  switch (restDivision) {
    case 0:
      summaryNumber =
        getNumberIndex(number, numberLength) +
        getNumberIndex(number, numberLength - 1) +
        getNumberIndex(number, numberLength - 2);
      break;
    case 1:
      summaryNumber = getNumberIndex(number, numberLength);
      break;
    case 2:
      summaryNumber =
        getNumberIndex(number, numberLength) +
        getNumberIndex(number, numberLength - 1);
      break;
  }

  return summaryNumber;
};

const addCommaToSeparateGroupThreeNumber = (number) => {
  number += "";
  return number
    .split("")
    .reverse()
    .join("")
    .split(/(...)/)
    .reverse()
    .join(",")
    .replace(/,(?=,)|,$|^,/g, "")
    .replace(/(,|^)(\d)(\d)?(\d)?/g, "$1$4$3$2");
};

const getUnitNumber = (number) => {
  let unit = "";
  const numberLength = number.length;
  switch (true) {
    case numberLength > 3 && numberLength < 7:
      unit = unitNumber.THOUSAND;
      break;
    case numberLength > 6 && numberLength < 10:
      unit = unitNumber.MILLION;
      break;
    case numberLength > 9:
      unit = unitNumber.MILLIARD;
      break;
  }
  return unit;
};

const presentMobileNumber = (mobile) => {
  let presentMobileNumber = [];
  let mobileSplit = mobile.split("");
  presentMobileNumber[0] = mobileSplit[0];
  presentMobileNumber[1] = mobileSplit[1];
  presentMobileNumber[2] = mobileSplit[2];
  presentMobileNumber[3] = mobileSplit[3];
  presentMobileNumber[4] = "  ";
  presentMobileNumber[5] = mobileSplit[4];
  presentMobileNumber[6] = mobileSplit[5];
  presentMobileNumber[7] = mobileSplit[6];
  presentMobileNumber[8] = "  ";
  presentMobileNumber[9] = mobileSplit[7];
  presentMobileNumber[10] = mobileSplit[8];
  presentMobileNumber[11] = "  ";
  presentMobileNumber[12] = mobileSplit[9];
  presentMobileNumber[13] = mobileSplit[10];
  return presentMobileNumber.join("");
};
const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ],
  englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];
const toEnglishNumber = (str) => {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(englishNumbers[i], i);
    }
  }
  return str;
};

const toFormatFinanceNumber = (number) => {
  return new Intl.NumberFormat().format(number).replace(".", ",");
};

const generateTextPrice = (number) => {
  return wordifyfaPackage.wordifyfa(number);
};

export default {
  toPersianNum,
  toEnglishNumber,
  getSummaryNumberForPresent,
  getUnitNumber,
  addCommaToSeparateGroupThreeNumber,
  presentMobileNumber,
  toFormatFinanceNumber,
  generateTextPrice,
};
