import React from "react";
import Sidebar from "../aside/Sidebar";

export default function UnAuthorized() {
  return (
    <>
      <Sidebar />

      <div className="content-wrapper" >
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>صفحه ارور ۴۰۳</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-left">
                  <li className="breadcrumb-item">
                    <a href="#">خانه</a>
                  </li>
                  <li className="breadcrumb-item active">صفحه ارور ۴۰۳</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning"> ۴۰۳</h2>

            <div className="error-content">
              <h3>
                <i className="fa fa-warning text-warning"></i>
                شما مجوز لازم برای ورود به این بخش را ندارید.
              </h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
