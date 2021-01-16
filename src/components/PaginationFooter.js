import * as SC from "../styledComponents";

import React from "react";

const { FooterContainer, PageButton, PaginationButton } = SC;

export function reposition(e) {
  e.preventDefault();
  document.getElementById("search-results").scrollIntoView({
    behavior: "smooth",
  });
}

export const decrementPage = (page) => page - 1;
export const incrementPage = (page) => page + 1;

export default function PaginationFooter({ page, setPage, totalResults }) {
  return (
    <FooterContainer>
      {page > 1 ? (
        <PaginationButton
          aria-label="previous page"
          name="previous page"
          onClick={(e) => {
            setPage(decrementPage(page));
            reposition(e);
          }}
        >{`<`}</PaginationButton>
      ) : (
        <div
          data-testid="placeholder-button"
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
          flex: "0 0 60%",
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
              key={`${pageNumber}-placeholder`}
              data-testid="placeholder-button"
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
              name={`page ${pageNumber}`}
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
          name="next page"
          onClick={(e) => {
            setPage(incrementPage(page));
            reposition(e);
          }}
        >{`>`}</PaginationButton>
      ) : (
        <div
          data-testid="placeholder-button"
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
