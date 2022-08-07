import React from "react";
import { useStore } from "effector-react";

import { $currentPage, $total, setCurrentPage } from "../model/model";

const PER_PAGE = 10;

const Pagination = () => {
  const total = useStore($total);
  const currentPage = useStore($currentPage);
  const pagesCount = Math.ceil(total / PER_PAGE);

  const handleChangePage = (evt) => {
    setCurrentPage(evt.target.text);
  };

  const handlePageBack = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };

  const handlePageNext = () => {
    currentPage < pagesCount && setCurrentPage(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={+currentPage === 1 ? "disabled" : "waves-effect"}
        onClick={handlePageBack}
      >
        <a href="#!">
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      {Array(pagesCount)
        .fill(null)
        .map((_, index) => (
          <li
            className={+currentPage === index + 1 ? "active" : "waves-effect"}
            key={index}
            onClick={handleChangePage}
          >
            <a href="#!">{index + 1}</a>
          </li>
        ))}
      <li
        className={+currentPage === pagesCount ? "disabled" : "waves-effect"}
        onClick={handlePageNext}
      >
        <a href="#!">
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
