import React from "react";
import {FcPrevious, FcNext} from "react-icons/fc"

const Pagination = ({
  totalData,
  dataPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      <button onClick={() => setCurrentPage(currentPage - 1)} className={`p-4 border-solid border-2 mx-2 rounded-full ${currentPage == 1 ? "pointer-events-none" : ""}`}><FcPrevious /></button>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            className={`px-4 py-2 border-solid border-2 mx-2 bg-blue-300 rounded-full ${
              page == currentPage ? "bg-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button onClick={() => setCurrentPage(currentPage + 1)} className={`p-4 border-solid border-2 mx-2 rounded-full ${currentPage == pages.length ? "pointer-events-none" : ""}`}><FcNext /></button>
    </div>
  );
};

export default Pagination;
