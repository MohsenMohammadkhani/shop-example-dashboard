import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Sidebar from "../../partials/aside/Sidebar";
import Title from "../../partials/Title";
import httpHelper from "../../../helpers/http";
import spinnerHelper from "../../../helpers/spinner";
import validateAddRole from "../../../validations/role/add";
import toastHelper from "../../../helpers/toast";

export default function Add() {
  const [permissions, setPermissions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getPermissions();
  }, []);

  async function getPermissions() {
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultGetPermission = await sendRequestGetPermission();
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultGetPermission.result) {
      return;
    }
    resultGetPermission = resultGetPermission.data;

    setPermissions(resultGetPermission);
  }

  async function sendRequestGetPermission() {
    try {
      const resultRequest = await httpHelper.getRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/auth/permission/all-permission`,
        getHeaderForRequest()
      );
      return {
        result: true,
        data: resultRequest.data.permissions,
      };
    } catch (error) {
      return {
        result: false,
        message: error.response.data.message,
      };
    }
  }

  function getHeaderForRequest() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        authorization: `Bearer ${token}`,
      },
    };
  }

  function generateAllPermissions() {
    if (!permissions) {
      return;
    }

    return (
      <div className="container-fluid">
        <div className="row bg-secondary rounded">
          {permissions.map((permission) => {
            return (
              <div className="col-12 col-sm-6 col-md-3">
                <span className="w-100 justify-content-between d-inline-flex align-items-center py-2 ">
                  <span className="small font-weight-bold text-nowrap ">
                    {permission.persian_name}
                  </span>

                  <span>
                    <label className="adl-switch">
                      <input
                        type="checkbox"
                        value={permission.id}
                        className="permissions"
                      />
                      <span className="adl-slider round"></span>
                    </label>
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function getFormData() {
    let permissionsIDS = "";

    document.querySelectorAll(".permissions:checked").forEach((permission) => {
      permissionsIDS += `${permission.defaultValue},`;
    });
    permissionsIDS = permissionsIDS.substring(0, permissionsIDS.length - 1);
    return {
      name: document.querySelector("#name").value,
      persian_name: document.querySelector("#persian_name").value,
      permissions_ids: permissionsIDS,
    };
  }

  async function sendRequestAddRole(formData) {
    try {
      await httpHelper.postRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/auth/role`,
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

  async function sendForm() {
    const formData = getFormData();
    const resultValidateAddRole = validateAddRole(formData);
    if (resultValidateAddRole != true) {
      toast.error(resultValidateAddRole, toastHelper.getOptionErrorToast());
      return;
    }

    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultAddRole = await sendRequestAddRole(formData);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultAddRole.result) {
      return;
    }

    toast.success("نفش اضافه شد.", {
      ...toastHelper.getOptionErrorToast(),
      autoClose: toastHelper.timeClose,
      onClose: () => {
        history.push(`/role/all`);
      },
    });
  }

  return (
    <div className="wrapper">
      <Sidebar />
      
      <div className="content-wrapper">
        <Title title="اضافه کردن نقش" />

        <section className="content">
          <div className="card">
            <div className="card-body">
              <div className="text-left pb-2">
                <Link to="/role/all" className="btn btn-primary">
                  <span className="pl-2">بازگشت</span>
                  <span>
                    <i className="fa fa-arrow-left"></i>
                  </span>
                </Link>
              </div>
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
                <div className="py-2">{generateAllPermissions()}</div>
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
