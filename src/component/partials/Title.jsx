import React from "react";

export default function Title({title}) {
  return (
    <section class="content-header pt-4 pb-0">
      <div class="container-fluid">
        <div class="row">
          <div class="w-100 text-center">
        <h1 class="px-5 py-1 bg-warning d-inline">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
