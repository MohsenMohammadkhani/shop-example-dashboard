import React, { useEffect, useState } from "react";
import Sidebar from "../../partials/aside/Sidebar";
import Title from "../../partials/Title";
import httpHelper from "../../../helpers/http";
import spinnerHelper from "../../../helpers/spinner";
import helpersNumbers from "../../../helpers/number";
import helpersTime from "../../../helpers/time";
import Pagination from "../../partials/Pagination";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function All() {
  const [permissions, setPermissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);

  const [permissionIDFilter, setPermissionIDFilter] = useState();
  const [permissionNameFilter, setPermissionNameFilter] = useState();
  const [permissionPersianNameFilter, setPermissionPersianNameFilter] =
    useState();

  useEffect(() => {
    getPermission();
  }, [
    currentPage,
    permissionIDFilter,
    permissionNameFilter,
    permissionPersianNameFilter,
  ]);

  async function getPermission() {
    const searchFilterQuery = getSearchFilterQuery();
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultGetPermission = await sendRequestGetPermission(searchFilterQuery);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultGetPermission.result) {
      return;
    }
    resultGetPermission = resultGetPermission.data;

    setPermissions(resultGetPermission.data);
    setCountPage(resultGetPermission.meta.last_page);
  }

  function getSearchFilterQuery() {
    let searchFilterQuery = "";

    if (permissionIDFilter) {
      searchFilterQuery = `${searchFilterQuery}&id=${permissionIDFilter}`;
    }

    if (permissionNameFilter) {
      searchFilterQuery = `${searchFilterQuery}&name=${permissionNameFilter}`;
    }

    if (permissionPersianNameFilter) {
      searchFilterQuery = `${searchFilterQuery}&persian_name=${permissionPersianNameFilter}`;
    }

    return searchFilterQuery;
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

  async function sendRequestGetPermission(searchFilterQuery) {
    try {
      const resultRequest = await httpHelper.getRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/auth/permission?page=${currentPage}${searchFilterQuery}`,
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

  const generateDoesNotHaveAnyPermissions = () => {
    return (
      <tr>
        <td colSpan={"100%"} className="text-center">
          دسترسی با این مشخصات وجود ندارد.
        </td>
      </tr>
    );
  };

  const paginationItemOnClickHandler = async (e) => {
    if (!e.target.attributes[1]) {
      return;
    }

    setCurrentPage(e.target.attributes[1].value);
  };

  const generatePagination = () => {
    return (
      <div className="py-2 d-flex flex-column flex-md-row  align-items-md-center  ">
        <Pagination
          countPage={countPage}
          currentPage={currentPage}
          paginationItemOnClickHandler={paginationItemOnClickHandler}
        />
      </div>
    );
  };

  function generateBodyTable() {
    return permissions.map((permission, index) => {
      return (
        <tr key={index}>
          <td>{helpersNumbers.toPersianNum(index + 1)}</td>
          <td>{helpersNumbers.toPersianNum(permission.id)}</td>
          <td>{permission.name}</td>
          <td>{permission.persian_name}</td>
          <td>
            {helpersNumbers.toPersianNum(
              helpersTime.convertUTCDateTimeToJalaliDateTime(
                permission.created_at
              )
            )}
          </td>
          <td>
            <Link
              className="btn btn-info  "
              to={"/permission/edit/" + permission.id}
            >
              <i className="fa fa-edit"></i>
            </Link>
          </td>
        </tr>
      );
    });
  }

  const generatePermissions = () => {
    return (
      <>
        <div className="container-fluid py-2 border border-1 rounded">
          <div className="row py-2">
            <div className="col-12 col-md-4">
              <div>
                <label>جستجو در شماره دسترسی</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="number"
                  onKeyUp={(e) => setPermissionIDFilter(e.target.value)}
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row py-2">
            <div className="col-12 col-md-4">
              <div>
                <label>جستجو در نام</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  onKeyUp={(e) => setPermissionNameFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div>
                <label>جستجو در نام و خانوادگی</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  onKeyUp={(e) =>
                    setPermissionPersianNameFilter(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive pt-3">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <td>#</td>
                <td>شماره دسترسی</td>
                <td>نام </td>
                <td>نام فارسی</td>
                <td>تاریخ درج</td>
                <td>عملیات</td>
              </tr>
            </thead>
            <tbody>
              {permissions.length > 0
                ? generateBodyTable()
                : generateDoesNotHaveAnyPermissions()}
            </tbody>
          </table>
          {countPage > 1 ? generatePagination() : <></>}
        </div>
      </>
    );
  };

  return (
    <div className="wrapper">
      <Sidebar openItem="role-permission" activeItem="all-permission" />
      <div className="content-wrapper">
        <Title title="دسترسی ها" />

        <section className="content">
          <div className="card">
            <div className="card-body">
              <div className="pb-2">
                <Link className="text-white" to="/permission/add">
                  <div className="btn btn-success">
                    <span className="pl-2">
                      <i
                        className="fa fa-plus text-white"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span>
                      <span className="text-white"> اضافه کردن دسترسی</span>
                    </span>
                  </div>
                </Link>
              </div>
              <div>{generatePermissions()}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
