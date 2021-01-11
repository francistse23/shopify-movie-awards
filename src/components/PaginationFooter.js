import { PageButton, PaginationButton } from "../styled-components";

import { FooterContainer } from "../styled-components";
import React from "react";

export default function PaginationFooter({ page, setPage, totalResults }) {
  function reposition(e) {
    e.preventDefault();
    document.getElementById("search-results").scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <FooterContainer>
      {page > 1 ? (
        <PaginationButton
          aria-label="previous page"
          onClick={(e) => {
            setPage((page) => page - 1);
            reposition(e);
          }}
        >{`<`}</PaginationButton>
      ) : (
        <div
          style={{
            backgroundColor: "transparent",
            border: "none",
            flex: "0 0 10%",
          }}
        />
      )}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: "0 0 70%",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {Array.from(
          Array(5),
          (_, i) => i + 1 + 5 * (Math.ceil(page / 5) - 1)
        ).map((pageNumber) =>
          pageNumber * 10 > Math.ceil(totalResults / 10) * 10 ? (
            <div
              style={{
                backgroundColor: "transparent",
                border: "none",
                flex: "0 0 10%",
              }}
            />
          ) : (
            <PageButton
              key={`${page}-${pageNumber}`}
              page={page}
              pageNumber={pageNumber}
              aria-label={`navigate to page ${pageNumber}`}
              onClick={(e) => {
                setPage(pageNumber);

                reposition(e);
              }}
            >
              {pageNumber}
            </PageButton>
          )
        )}
      </div>
      {10 * page < totalResults ? (
        <PaginationButton
          aria-label="next page"
          onClick={(e) => {
            setPage((page) => page + 1);
            reposition(e);
          }}
        >{`>`}</PaginationButton>
      ) : (
        <div
          style={{
            backgroundColor: "transparent",
            border: "none",
            flex: "0 0 10%",
          }}
        />
      )}
    </FooterContainer>
  );
}
