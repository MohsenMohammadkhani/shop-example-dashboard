import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Sidebar from "../../partials/aside/Sidebar";
import Title from "../../partials/Title";
import Pagination from "../../partials/Pagination";
import helpersNumbers from "../../../helpers/number";
import spinnerHelper from "../../../helpers/spinner";
import helpersTime from "../../../helpers/time";
import httpHelper from "../../../helpers/http";

export default function All() {
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const [roleIDFilter, setRoleIDFilter] = useState();
  const [roleNameFilter, setRoleNameFilter] = useState();
  const [rolePersianNameFilter, setRolePersianNameFilter] = useState();

  useEffect(() => {
    getRole();
  }, [currentPage, roleIDFilter, roleNameFilter, rolePersianNameFilter]);

  async function getRole() {
    const searchFilterQuery = getSearchFilterQuery();
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultGetRole = await sendRequestGetRole(searchFilterQuery);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    if (!resultGetRole.result) {
      return;
    }
    resultGetRole = resultGetRole.data;

    setRoles(resultGetRole.data);
    setCountPage(resultGetRole.meta.last_page);
  }

  function getSearchFilterQuery() {
    let searchFilterQuery = "";

    if (roleIDFilter) {
      searchFilterQuery = `${searchFilterQuery}&id=${roleIDFilter}`;
    }

    if (roleNameFilter) {
      searchFilterQuery = `${searchFilterQuery}&name=${roleNameFilter}`;
    }

    if (rolePersianNameFilter) {
      searchFilterQuery = `${searchFilterQuery}&persian_name=${rolePersianNameFilter}`;
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

  async function sendRequestGetRole(searchFilterQuery) {
    try {
      const resultRequest = await httpHelper.getRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/auth/role?page=${currentPage}${searchFilterQuery}`,
        getHeaderForRequest()
      );
      return {
        result: true,
        data: resultRequest.data.roles,
      };
    } catch (error) {
      return {
        result: false,
        message: error.response.data.message,
      };
    }
  }

  const generateDoesNotHaveAnyRole = () => {
    return (
      <tr>
        <td colSpan={"100%"} className="text-center">
          نقش با این مشخصات وجود ندارد.
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
    return roles.map((role, index) => {
      return (
        <tr key={index}>
          <td>{helpersNumbers.toPersianNum(index + 1)}</td>
          <td>{helpersNumbers.toPersianNum(role.id)}</td>
          <td>{role.name}</td>
          <td>{role.persian_name}</td>
          <td>
            {helpersNumbers.toPersianNum(
              helpersTime.convertUTCDateTimeToJalaliDateTime(role.created_at)
            )}
          </td>
          <td>
            <Link className="btn btn-info  " to={"/role/edit/" + role.id}>
              <i className="fa fa-edit"></i>
            </Link>
          </td>
        </tr>
      );
    });
  }

  const generateRoles = () => {
    return (
      <>
        <div className="container-fluid py-2 border border-1 rounded">
          <div className="row py-2">
            <div className="col-12 col-md-4">
              <div>
                <label>جستجو در شماره نقش</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="number"
                  onKeyUp={(e) => setRoleIDFilter(e.target.value)}
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
                  onKeyUp={(e) => setRoleNameFilter(e.target.value)}
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
                  onKeyUp={(e) => setRolePersianNameFilter(e.target.value)}
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
                <td>شماره نقش</td>
                <td>نام </td>
                <td>نام فارسی</td>
                <td>تاریخ درج</td>
                <td>عملیات</td>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0
                ? generateBodyTable()
                : generateDoesNotHaveAnyRole()}
            </tbody>
          </table>
          {countPage > 1 ? generatePagination() : <></>}
        </div>
      </>
    );
  };

  return (
    <div className="wrapper">
      <Sidebar openItem="role-permission" activeItem="all-role" />
      <div className="content-wrapper">
        <Title title="نقش ها" />

        <section className="content">
          <div className="card">
            <div className="card-body">
              <div className="pb-2">
                <Link className="text-white" to="/role/add">
                  <div className="btn btn-success">
                    <span className="pl-2">
                      <i
                        className="fa fa-plus text-white"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span>
                      <span className="text-white"> اضافه کردن نقش</span>
                    </span>
                  </div>
                </Link>
              </div>
              <div>{generateRoles()} </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
