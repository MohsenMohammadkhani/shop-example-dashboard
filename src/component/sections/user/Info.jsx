import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/aside/Sidebar";
import Title from "../../partials/Title";
import { toast } from "react-toastify";
import { DatePicker } from "react-advance-jalaali-datepicker";
import helpersTime from "../../../helpers/time";
import httpHelper from "../../../helpers/http";
import toastHelper from "../../../helpers/toast";
import spinnerHelper from "../../../helpers/spinner";
import moment from "moment";
import { connect } from "react-redux";
import Cookies from "js-cookie";

function Info({ mobileNumber }) {
  const [userInfo, setUserInfo] = useState();
  const [birthdayDate, setBirthdayDate] = useState(
    helpersTime.convertGregorianToJalali(moment(helpersTime.getDateNow()))
  );

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    const resultGetUserInfo = await sendRequestGetUserInfo();
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultGetUserInfo.result) {
      return;
    }
    setUserInfo(resultGetUserInfo.data);
    setBirthdayDate(resultGetUserInfo.data["birthday"]);
  }

  async function sendRequestGetUserInfo() {
    try {
      const result = await httpHelper.getRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/user/get-info`,
        getHeaderForRequest()
      );

      return {
        result: true,
        data: result.data.info,
      };
    } catch (error) {
      toast.error(
        error.response.data.message,
        toastHelper.getOptionErrorToast()
      );
      return {
        result: false,
      };
    }
  }

  async function sendForm(e) {
    e.preventDefault();
    const formData = getFormData();
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    const resultSendRequestUserFill = await sendRequestUserFill(formData);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultSendRequestUserFill) {
      return;
    }
  }

  function getFormData() {
    return {
      "first-name": document.querySelector("#first-name").value,
      "last-name": document.querySelector("#last-name").value,
      "national-code": document.querySelector("#national-code").value,
      birthday: document.querySelector("#birthday").value,
      gender: document.querySelector("#gender").value,
    };
  }

  function getHeaderForRequest() {
    //const token = localStorage.getItem("token");
    const token = Cookies.get("she-token");
    return {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        authorization: `Bearer ${token}`,
      },
    };
  }

  async function sendRequestUserFill(formData) {
    try {
      await httpHelper.postRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/user/fill-info`,
        formData,
        getHeaderForRequest()
      );
      return {
        result: true,
      };
    } catch (error) {
      toast.error(
        error.response.data.message,
        toastHelper.getOptionErrorToast()
      );
      return {
        result: false,
      };
    }
  }

  return (
    <div className="wrapper">
      <Sidebar openItem="user-info" activeItem="user-info" />
      <div className="content-wrapper">
        <Title title="اطلاعات کاربر" />

        <section className="content">
          <div className="card">
            <div className="card-body">
              <div>
                <form onSubmit={sendForm}>
                  <div className="d-flex flex-wrap">
                    <div className="form-group">
                      <label>نام</label>
                      <input
                        tabIndex="1"
                        dir="rtl"
                        type="text"
                        id="first-name"
                        className="form-control"
                        defaultValue={userInfo && userInfo["first-name"]}
                        required
                      />
                    </div>

                    <div className="form-group px-3">
                      <label>نام خانوادگی</label>
                      <input
                        tabIndex="1"
                        dir="rtl"
                        type="text"
                        id="last-name"
                        defaultValue={userInfo && userInfo["last-name"]}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group ">
                      <label>شماره موبایل</label>
                      <input
                        tabIndex="1"
                        dir="rtl"
                        type="text"
                        id="mobile"
                        defaultValue={mobileNumber}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-wrap">
                    <div className="form-group">
                      <label>کدملی</label>
                      <input
                        tabIndex="1"
                        dir="rtl"
                        type="number"
                        id="national-code"
                        defaultValue={userInfo && userInfo["national-code"]}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group px-3">
                      <label>تاریخ تولد</label>
                      <div className="custom-data-picker">
                        {userInfo !== undefined ? (
                          <DatePicker
                            placeholder="انتخاب تاریخ"
                            format="jYYYY/jMM/jDD"
                            id="birthday"
                            preSelected={birthdayDate}
                          />
                        ) : (
                          <> </>
                        )}
                      </div>
                    </div>
                    <div className="form-group ">
                      <label>جنسیت</label>
                      <select id="gender" required className="form-control">
                        <option
                          value="1"
                          selected={
                            userInfo && userInfo.gender == "1" && "selected"
                          }
                        >
                          مذکر
                        </option>
                        <option
                          value="2"
                          selected={
                            userInfo && userInfo.gender == "2" && "selected"
                          }
                        >
                          مونث
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">ارسال</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    mobileNumber: state.auth.mobileNumber,
  };
}

export default connect(mapStateToProps, {})(Info);
