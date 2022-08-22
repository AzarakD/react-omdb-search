import React from "react";
import { useEvent, useStore } from "effector-react";

import { $currentPage, $pagesCount, currentPageSet } from "../model";

const Pagination = () => {
  const currentPage = useStore($currentPage);
  const pagesCount = useStore($pagesCount);

  const setCurrentPage = useEvent(currentPageSet);

  const handleChangePage = (evt) => {
    const page = +evt.target.text;
    page !== currentPage && setCurrentPage(page);
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
        className={currentPage === 1 ? "disabled" : "waves-effect"}
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
            className={currentPage === index + 1 ? "active" : "waves-effect"}
            key={index}
            onClick={handleChangePage}
          >
            <a href="#!">{index + 1}</a>
          </li>
        ))}
      <li
        className={currentPage === pagesCount ? "disabled" : "waves-effect"}
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
