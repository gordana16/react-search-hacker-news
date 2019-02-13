import React from "react";
import PageItem from "./PageItem";

const Pagination = ({ fetchPage, currentPage, nbPages }) => {
  const PAGE_ITEMS = 10;

  if (nbPages === 0) return null;

  const fetchPageHandler = newPage => {
    return fetchPage(newPage - 1);
  };
  const startPage =
    (currentPage <= PAGE_ITEMS / 2 && 1) ||
    (currentPage > nbPages - PAGE_ITEMS / 2 && nbPages - PAGE_ITEMS + 1) ||
    currentPage - PAGE_ITEMS / 2;
  const items = [];
  for (let i = 0; i < PAGE_ITEMS + 2; i++) {
    const isPrev = i === 0;
    const isNext = i === PAGE_ITEMS + 1;
    const isBeforeFirst = isPrev && currentPage === 1;
    const isAfterLast = isNext && nbPages - startPage < PAGE_ITEMS;
    items.push(
      <PageItem
        fetchPage={fetchPageHandler}
        page={(isPrev && "Previous") || (isNext && "Next") || startPage + i - 1}
        addClass={
          ((isBeforeFirst || isAfterLast) && "disabled") ||
          (i === currentPage - startPage + 1 && "active") ||
          ""
        }
        prev={isPrev && !isBeforeFirst ? currentPage - 1 : -1}
        next={isNext && !isAfterLast ? currentPage + 1 : -1}
        key={i}
      />
    );
  }
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">{items}</ul>
    </nav>
  );
};

export default Pagination;
