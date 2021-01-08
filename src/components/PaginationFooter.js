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
          flex: "0 0 80%",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* need to fix rendering */}
        {/* currently rendering more than 8 pages if there are 79 items */}
        {(page * 10 > totalResults
          ? Array.from(Array(5), (_, i) => page - 4 + i)
          : Array.from(Array(5), (_, i) => (page > 1 ? page + i - 1 : page + i))
        ).map((pageNumber) => (
          <PageButton
            key={`${page}-${pageNumber}`}
            page={page}
            pageNumber={pageNumber}
            aria-label={`navigate to page ${pageNumber}`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </PageButton>
        ))}
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
