import React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Sidebar from "../../partials/aside/Sidebar";
import Title from "../../partials/Title";
import validateAddPermission from "../../../validations/permission/add";
import toastHelper from "../../../helpers/toast";
import httpHelper from "../../../helpers/http";
import spinnerHelper from "../../../helpers/spinner";

export default function Add() {
  const history = useHistory();

  async function sendForm() {
    const formData = getFormData();
    const resultValidateAddPermission = validateAddPermission(formData);
    if (resultValidateAddPermission != true) {
      toast.error(
        resultValidateAddPermission,
        toastHelper.getOptionErrorToast()
      );
      return;
    }

    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultAddPermission = await sendRequestAddPermission(formData);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultAddPermission.result) {
      return;
    }

    toast.success("دسترسی اضافه شد.", {
      ...toastHelper.getOptionErrorToast(),
      autoClose: toastHelper.timeClose,
      onClose: () => {
        history.push(`/permission/all`);
      },
    });
  }

  function getHeaderForRequest() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
  }

  async function sendRequestAddPermission(formData) {
    try {
      await httpHelper.postRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/auth/permission`,
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

  function getFormData() {
    return {
      name: document.querySelector("#name").value,
      persian_name: document.querySelector("#persian_name").value,
    };
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Title title="اضافه کردن دسترسی" />

        <section className="content">
          <div className="card">
            <div className="card-body">
              <div className="alert alert-warning w-100 ">
                <p className="text-justify">
                  <i className="fa fa-info pl-2"></i>
                  توجه داشته باشید :{" "}
                </p>
                <ul className="pr-3">
                  <li>
                    <p className="text-justify m-0">
                      نام انگلیسی و نام فارسی هر دو یکتا یا یونیک هستن و تکراری
                      نمی توان باشن
                    </p>
                  </li>
                </ul>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendForm();
                }}
              >
                <div className="form-group">
                  <label>نام انگلیسی</label>
                  <input
                    tabIndex="1"
                    dir="ltr"
                    type="text"
                    id="name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>نام فارسی</label>
                  <input
                    tabIndex="2"
                    dir="rtl"
                    type="text"
                    id="persian_name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">اضافه کردن</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
