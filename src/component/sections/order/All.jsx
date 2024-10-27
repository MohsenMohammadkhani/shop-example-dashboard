import React from "react";
import Sidebar from "../../partials/aside/Sidebar";
import Title from "../../partials/Title";

export default function All() {
  return (
    <div className="wrapper">
      <Sidebar openItem="customer-order" activeItem="customer-order" />
      <div className="content-wrapper">
        <Title title="سفارش های شما" />

        <section className="content">
          <div className="card">
            <div className="card-body">aaa</div>
          </div>
        </section>
      </div>
    </div>
  );
}
