import React from "react";

const PageItem = ({ fetchPage, page, prev, next, addClass = "" }) => {
  const onClickHandler = () => {
    if (page === "Previous" && !addClass.includes("disabled")) {
      fetchPage(prev);
    } else if (page === "Next" && !addClass.includes("disabled")) {
      fetchPage(next);
    } else {
      fetchPage(page);
    }
  };
  const isActive = addClass === "active";
  const srOnly = isActive ? <span className="sr-only">(current)</span> : null;

  return (
    <li
      className={`page-item ${addClass}`}
      aria-current={isActive ? "page" : ""}
    >
      <span className="page-link" onClick={onClickHandler}>
        {page} {srOnly}
      </span>
    </li>
  );
};

export default PageItem;
