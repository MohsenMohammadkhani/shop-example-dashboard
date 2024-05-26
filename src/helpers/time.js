import moment from "moment";
import momentJalali from "jalali-moment";

const getDateNowJalali = () => {
  return momentJalali().locale("fa").format("YYYY/M/D");
};

const getDateNow = () => {
  return moment().format();
};

const prepareDateString = (date) => {
  let dateSplit = date.replace("T", " ").split("+");
  return dateSplit[0];
};

const addStartTime = (dateString) => {
  return dateString + " 00:00:00";
};
const addEndTime = (dateString) => {
  return dateString + " 23:59:59";
};

const getLastDayDate = (dayNumber) => {
  return moment().subtract(dayNumber, "d").format("YYYY-MM-DD");
};

const convertUTCDateTimeToJalaliDateTime = (dateTime) => {
  dateTime = dateTime.replace("T", " ").replace("-", "/").replace("-", "/").split(".")[0];
  
  let time = dateTime.split(" ")[1];
  let date = dateTime.split(" ")[0];
  let jalaliDate = convertGregorianToJalali(date, "YYYY/MM/DD", "YYYY/MM/DD");

  return jalaliDate + " " + time;
};

const convertJalaliToGregorian = (jalaliDate) => {
  return momentJalali
    .from(jalaliDate, "fa", "YYYY/MM/DD")
    .locale("en")
    .format("YYYY/MM/DD");
};

const convertGregorianToJalali = (
  gregorianDate,
  formatInput = "YYYY/MM/DD",
  formatOutput = "YYYY/MM/DD"
) => {
  let date = momentJalali
    .from(gregorianDate, "en", formatInput)
    .locale("fa")
    .format(formatOutput);
  return date.replace("آدینه", "جمعه");
};

const getDifferentDates = (dateFrom, dateTo) => {
  let differentDates = moment(dateFrom).diff(moment(dateTo), "days");
  if (differentDates < 0) {
    return -differentDates;
  }
  return differentDates;
};

const getDayNameFromDateString = (dateString, locale) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

export default {
  prepareDateString,
  addStartTime,
  addEndTime,
  getLastDayDate,
  getDateNow,
  getDateNowJalali,
  convertJalaliToGregorian,
  getDifferentDates,
  convertGregorianToJalali,
  getDayNameFromDateString,
  convertUTCDateTimeToJalaliDateTime,
};
