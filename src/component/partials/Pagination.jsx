import React from "react";
import helperNumber from "../../helpers/number";

function Pagination({ countPage, currentPage, paginationItemOnClickHandler }) {
  currentPage = parseInt(currentPage);

  let tags = [];

  const addEllipsis = () => {
    return (
      <div key={Math.random()} className="p-2">
        <span>.....</span>
      </div>
    );
  };

  const addButton = (page, active = false) => {
    let classActive = active == true ? "btn-outline-success" : "btn-success";
    return (
      <div className="p-2">
        <span
          className={`btn  ${classActive} `}
          onClick={(e) => {
            paginationItemOnClickHandler(e);
          }}
          data-number={page}
        >
          {helperNumber.toPersianNum(page)}
        </span>
      </div>
    );
  };

  const addButtonArrow = (arrow, page) => {
    return (
      <div className="p-2">
        <span
          className="btn btn-success"
          onClick={(e) => {
            paginationItemOnClickHandler(e);
          }}
          data-number={page}
        >
          <i className={`fa fa-angle-${arrow}`}></i>
        </span>
      </div>
    );
  };

  const generateTagPageCurrentOne = () => {
    switch (countPage) {
      case 1:
        break;

      case 2:
        tags.push(addButton(1, true));
        tags.push(addButton(2));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;

      case 3:
        tags.push(addButton(1, true));
        tags.push(addButton(2));
        tags.push(addButton(3));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;

      case 4:
        tags.push(addButton(1, true));
        tags.push(addButton(2));
        tags.push(addEllipsis());
        tags.push(addButton(4));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;

      default:
        tags.push(addButton(1, true));
        tags.push(addButton(2));
        tags.push(addEllipsis());
        tags.push(addButton(countPage));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;
    }
  };

  const generateTagPageCurrentTwo = () => {
    switch (countPage) {
      case 2:
        tags.push(addButtonArrow("right", currentPage - 1));
        tags.push(addButton(1));
        tags.push(addButton(2, true));
        break;

      case 3:
        tags.push(addButtonArrow("right", currentPage - 1));
        tags.push(addButton(1));
        tags.push(addButton(2, true));
        tags.push(addButton(3));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;

      case 4:
        tags.push(addButtonArrow("right", currentPage - 1));
        tags.push(addButton(1));
        tags.push(addButton(2, true));
        tags.push(addButton(3));
        tags.push(addButton(4));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;

      default:
        tags.push(addButtonArrow("right", currentPage - 1));
        tags.push(addButton(1));
        tags.push(addButton(2, true));
        tags.push(addButton(3));
        tags.push(addEllipsis());
        tags.push(addButton(countPage));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;
    }
  };

  const generateTagPageCurrentThree = () => {
    switch (countPage) {
      case 3:
        tags.push(addButtonArrow("right", currentPage - 1));
        tags.push(addButton(1));
        tags.push(addButton(2));
        tags.push(addButton(3, true));
        break;

      case 4:
        tags.push(addButtonArrow("right", currentPage - 1));
        tags.push(addButton(1));
        tags.push(addButton(2));
        tags.push(addButton(3, true));
        tags.push(addButton(4));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;

      default:
        tags.push(addButtonArrow("right", currentPage - 1));
        tags.push(addButton(1));
        tags.push(addEllipsis());
        tags.push(addButton(2));
        tags.push(addButton(3, true));
        tags.push(addButton(4));
        tags.push(addEllipsis());
        tags.push(addButton(countPage));
        tags.push(addButtonArrow("left", currentPage + 1));
        break;
    }
  };

  const generateTagPageCurrentNormal = () => {
    tags.push(addButtonArrow("right", currentPage - 1));
    tags.push(addButton(1));
    tags.push(addEllipsis());
    tags.push(addButton(currentPage - 1));
    tags.push(addButton(currentPage, true));
    tags.push(addButton(currentPage + 1));
    tags.push(addEllipsis());
    tags.push(addButton(countPage));
    tags.push(addButtonArrow("left", currentPage + 1));
  };

  const generateTagPageCurrentEqualCountPage = () => {
    tags.push(addButtonArrow("right", currentPage - 1));
    tags.push(addButton(1));
    tags.push(addEllipsis());
    tags.push(addButton(countPage - 1));
    tags.push(addButton(countPage, true));
  };

  const generateTagPageCurrentEqualCountPageOneLess = () => {
    tags.push(addButtonArrow("right", currentPage - 1));
    tags.push(addButton(1));
    tags.push(addEllipsis());
    tags.push(addButton(currentPage - 1));
    tags.push(addButton(currentPage, true));
    tags.push(addButton(countPage));
    tags.push(addButtonArrow("left", currentPage + 1));
  };

  const generateTagPageCurrentEqualCountPageTowLess = () => {
    tags.push(addButtonArrow("right", currentPage - 1));
    tags.push(addButton(1));
    tags.push(addEllipsis());
    tags.push(addButton(currentPage - 1));
    tags.push(addButton(currentPage, true));
    tags.push(addButton(currentPage + 1));
    tags.push(addButton(countPage));
    tags.push(addButtonArrow("left", currentPage + 1));
  };

  switch (true) {
    case currentPage == 1:
      generateTagPageCurrentOne();
      break;

    case currentPage == 2:
      generateTagPageCurrentTwo();
      break;

    case currentPage == 3:
      generateTagPageCurrentThree();
      break;

    case currentPage > 3 && currentPage < countPage - 2:
      generateTagPageCurrentNormal();
      break;

    case currentPage == countPage - 2:
      generateTagPageCurrentEqualCountPageTowLess();
      break;

    case currentPage == countPage - 1:
      generateTagPageCurrentEqualCountPageOneLess();
      break;

    case currentPage == countPage:
      generateTagPageCurrentEqualCountPage();
      break;
  }

  return (
    <div className="d-flex flex-wrap" id="pagination-tickets-user">
      {tags}
    </div>
  );
}

export default Pagination;
