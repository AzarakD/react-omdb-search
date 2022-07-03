import React from "react";

const PER_PAGE = 10;

const Pagination = (props) => {
  const { total, currentPage } = props;
  const pagesCount = Math.ceil(total / PER_PAGE);

  const handleChangePage = (evt) => {
    props.handleChangePage(evt.target.text);
  };

  const handlePageBack = () => {
    currentPage > 1 && props.handleChangePage(currentPage - 1);
  };

  const handlePageNext = () => {
    currentPage < pagesCount && props.handleChangePage(currentPage + 1);
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
