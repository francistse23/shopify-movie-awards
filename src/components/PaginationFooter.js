import { PageButton, PaginationButton } from "../styled-components";

import { FooterContainer } from "../styled-components";
import React from "react";

export default function PaginationFooter({ page, setPage, totalResults }) {
  return (
    <FooterContainer>
      {page > 1 ? (
        <PaginationButton
          aria-label="previous page"
          onClick={() => setPage((page) => page - 1)}
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
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </PageButton>
          )
        )}
      </div>
      {10 * page < totalResults ? (
        <PaginationButton
          aria-label="next page"
          onClick={() => setPage((page) => page + 1)}
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
