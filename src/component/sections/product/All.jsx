import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Sidebar from "../../partials/aside/Sidebar";
import { toast } from "react-toastify";
import toastHelper from "../../../helpers/toast";
import Title from "../../partials/Title";
import httpHelper from "../../../helpers/http";
import spinnerHelper from "../../../helpers/spinner";
import helpersTime from "../../../helpers/time";
import Pagination from "../../partials/Pagination";
import helpersNumbers from "../../../helpers/number";

export default function All() {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);

  const [roleIDFilter, setProductIDFilter] = useState();
  const [titleSearchFilter, setTitleSearchFilter] = useState();

  useEffect(() => {
    getProducts();
  }, [currentPage, roleIDFilter, titleSearchFilter]);

  async function getProducts() {
    const searchFilterQuery = getSearchFilterQuery();
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultGetProducts = await sendRequestGetProducts(searchFilterQuery);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);

    if (!resultGetProducts.result) {
      return;
    }
    setProducts(resultGetProducts.products.data);
    setCountPage(resultGetProducts.products.meta.last_page);
  }

  function getSearchFilterQuery() {
    let searchFilterQuery = "";

    if (roleIDFilter) {
      searchFilterQuery = `${searchFilterQuery}&id=${roleIDFilter}`;
    }

    if (titleSearchFilter) {
      searchFilterQuery = `${searchFilterQuery}&title=${titleSearchFilter}`;
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

  async function sendRequestGetProducts(searchFilterQuery) {
    try {
      const resultRequest = await httpHelper.getRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/product?page=${currentPage}${searchFilterQuery}`,
        getHeaderForRequest()
      );

      return {
        result: true,
        products: resultRequest.data.products,
      };
    } catch (error) {
      return {
        result: false,
        message: error.response.data.message,
      };
    }
  }

  const generateDoesNotHaveAnyProducts = () => {
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

  async function removeProduct(productID) {
    spinnerHelper.showSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);
    let resultRemoveProduct = await sendRequestRemoveProduct(productID);
    spinnerHelper.removeSpinner(spinnerHelper.CLASS_CONTENT_WRAPPER_TAG);

    if (!resultRemoveProduct) {
      return;
    }

    toast.success("محصول حذف شد.", {
      ...toastHelper.getOptionErrorToast(),
      autoClose: toastHelper.timeClose,
      onClose: () => {
        getProducts();
      },
    });
  }

  async function sendRequestRemoveProduct(productID) {
    try {
      await httpHelper.deleteRequest(
        `${process.env.REACT_APP_DOMAIN_API}/api/v1/dashboard/product/${productID}`,
        getHeaderForRequest()
      );

      return true;
    } catch (error) {
      toast.error(
        error.response.data.message,
        toastHelper.getOptionErrorToast()
      );
      return false;
    }
  }

  function generateBodyTable() {
    return products.map((product, index) => {
      return (
        <tr key={index}>
          <td>{helpersNumbers.toPersianNum(index + 1)}</td>
          <td>{helpersNumbers.toPersianNum(product.id)}</td>
          <td>{product.title}</td>
          <td>{product.slug}</td>
          <td className="number-finance">
            {helpersNumbers.toPersianNum(
              helpersNumbers.toFormatFinanceNumber(product.price)
            )}
          </td>
          <td>
            {helpersNumbers.toPersianNum(
              helpersTime.convertUTCDateTimeToJalaliDateTime(product.created_at)
            )}
          </td>
          <td>
            <span>
              <Link
                className="btn btn-info  "
                to={"/product/edit/" + product.id}
              >
                <i className="fa fa-edit"></i>
              </Link>
            </span>

            <span className="pr-2">
              <span
                className="btn btn-danger"
                onClick={() => {
                  let isSure = window.confirm("آیا شما مطمئن هستید؟");
                  if (!isSure) {
                    return;
                  }
                  removeProduct(product.id);
                }}
              >
                <i className="fa fa-trash"></i>
              </span>
            </span>
          </td>
        </tr>
      );
    });
  }

  const generateProducts = () => {
    return (
      <>
        <div className="container-fluid py-2 border border-1 rounded">
          <div className="row py-2">
            <div className="col-12 col-md-4">
              <div>
                <label>جستجو در شماره محصول</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="number"
                  onKeyUp={(e) => setProductIDFilter(e.target.value)}
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row py-2">
            <div className="col-12 col-md-4">
              <div>
                <label>جستجو در عنوان</label>
              </div>
              <div>
                <input
                  className="form-control"
                  type="text"
                  onKeyUp={(e) => setTitleSearchFilter(e.target.value)}
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
                <td>شماره محصول</td>
                <td>عنوان</td>
                <td>اسلاگ</td>
                <td>قیمت</td>
                <td>تاریخ درج</td>
                <td>عملیات</td>
              </tr>
            </thead>
            <tbody>
              {products.length > 0
                ? generateBodyTable()
                : generateDoesNotHaveAnyProducts()}
            </tbody>
          </table>
          {countPage > 1 ? generatePagination() : <></>}
        </div>
      </>
    );
  };

  return (
    <div className="wrapper">
      {/* <Sidebar openItem="products" activeItem="all" /> */}
      <Sidebar openItem="products" activeItem="all" />
      <div className="content-wrapper">
        <Title title="لیست محصول ها" />

        <section className="content">
          <div className="card">
            <div className="card-body">
              <div className="pb-2">
                <Link className="text-white" to="/product/add">
                  <div className="btn btn-success">
                    <span className="pl-2">
                      <i
                        className="fa fa-plus text-white"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span>
                      <span className="text-white"> اضافه کردن محصول</span>
                    </span>
                  </div>
                </Link>
              </div>
              <div>{generateProducts()} </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
