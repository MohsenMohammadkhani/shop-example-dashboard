import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import toastHelper from "../../../helpers/toast";
import validateMobile from "../../../validations/mobile";
import httpHelper from "../../../helpers/http";
import spinnerHelper from "../../../helpers/spinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";

export default function LoginWithMobileNumber() {
  const [mobileNumber, setMobileNumber] = useState();

  const getHeaderForRequest = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        authorization: `Bearer ${token}`,
      },
    };
  };

  const sendRequestSendSmsCodeForLogin = async (mobileNumber) => {
    try {
      await httpHelper.postRequest(
        process.env.REACT_APP_DOMAIN_API +
          "/api/v1/dashboard/auth/send-sms-code-login",
        { "mobile-number": mobileNumber },
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
        message: error.response.data.message,
      };
    }
  };

  const sendSmsCodeLogin = async () => {
    const mobileNumber = "09" + document.querySelector("#mobile-number").value;
    const resultValidateMobile = validateMobile(mobileNumber);
    if (!resultValidateMobile.result) {
      toast.error(
        resultValidateMobile.message,
        toastHelper.getOptionErrorToast()
      );
      return;
    }

    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    const resultSendRequestSendSmsCodeForLogin =
      await sendRequestSendSmsCodeForLogin(mobileNumber);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultSendRequestSendSmsCodeForLogin.result) {
      toast.error(
        resultValidateMobile.message,
        toastHelper.getOptionErrorToast()
      );
      return;
    }

    document.querySelector("#mobile-number").value = "";
    setMobileNumber(mobileNumber);
  };

  const showFormEnterMobileNumber = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendSmsCodeLogin();
        }}
      >
        <p class="login-box-msg">شماره موبایل خود را وارد کنید</p>

        <div class="input-group mb-2 mr-sm-2">
          <input
            className="form-control text-left"
            type="text"
            placeholder="۱۲۹۲۴۵۵۰۸"
            id="mobile-number"
            name="mobile-number"
          />
          <div class="input-group-prepend">
            <div class="input-group-text">۰۹</div>
          </div>
        </div>
        <div className="py-2">
          <button className="btn btn-primary w-100">ارسال کد</button>
        </div>
      </form>
    );
  };

  const sendRequestLoginWithSmsCode = async (bodyRequest) => {
    try {
      const resultRequest = await httpHelper.postRequest(
        process.env.REACT_APP_DOMAIN_API +
          "/api/v1/dashboard/auth/login-with-sms-code",
        bodyRequest,
        getHeaderForRequest()
      );

      return {
        result: true,
        token: resultRequest.data.token,
      };
    } catch (error) {
      return {
        result: false,
        message: error.response.data.message,
      };
    }
  };

  const enterToDashboard = async () => {
    const smsCode = document.querySelector("#sms-code").value;

    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    const resultSendRequestLoginWithSmsCode = await sendRequestLoginWithSmsCode(
      {
        "mobile-number": mobileNumber,
        "sms-code": smsCode,
      }
    );
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);

    if (!resultSendRequestLoginWithSmsCode.result) {
      toast.error(
        resultSendRequestLoginWithSmsCode.message,
        toastHelper.getOptionErrorToast()
      );
      return;
    }

    Cookies.set("she-token", resultSendRequestLoginWithSmsCode.token);
    //localStorage.setItem("token", resultSendRequestLoginWithSmsCode.token);

    toast.success("ورود شما مو.فقیت آمیز بود", {
      ...toastHelper.getOptionErrorToast(),
      autoClose: toastHelper.timeClose,
      onClose: () => {
        window.location = "/";
      },
    });
  };

  const showFormEnterSmsCode = () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          enterToDashboard();
        }}
      >
        <p class="login-box-msg"> کد داخل پیامک را وارد کنید</p>
        <div className="py-2">
          <input
            className="form-control text-center"
            type="number"
            placeholder="کد ورود"
            id="sms-code"
            name="sms-code"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="py-2">
          <button className="btn btn-primary w-100 ">ورود</button>
        </div>
      </form>
    );
  };

  return (
    <>
      <div className="content-wrapper">
        <div class="login-box">
          <div class="login-logo">
            <b>ورود به داشبورد</b>
          </div>
          <div class="card">
            <div class="card-body login-card-body">
              {mobileNumber
                ? showFormEnterSmsCode()
                : showFormEnterMobileNumber()}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
