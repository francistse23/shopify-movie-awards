import React from "react";
import { PageButton } from "../styled-components";

export default function PaginationFooter({ page, setPage }) {
  return (
    <footer
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "300px",
        margin: "1rem auto",
        padding: "1rem",
      }}
    >
      {page > 1 ? (
        <button
          aria-label="previous page"
          style={{ flex: 1 }}
          onClick={() => setPage((page) => page - 1)}
        >{`<`}</button>
      ) : (
        <button
          disabled
          style={{ backgroundColor: "transparent", border: "none", flex: 1 }}
        />
      )}
      <div
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flex: 6,
          width: "100%",
        }}
      >
        {Array.from(Array(5), (_, i) => page + i).map((element) => (
          <PageButton
            page={page}
            element={element}
            aria-label={`navigate to page ${element}`}
            onClick={() => setPage(element)}
          >
            {element}
          </PageButton>
        ))}
      </div>
      {page < 100 ? (
        <button
          aria-label="next page"
          style={{ flex: 1 }}
          onClick={() => setPage((page) => page + 1)}
        >{`>`}</button>
      ) : (
        <button
          disabled
          style={{ backgroundColor: "transparent", border: "none", flex: 1 }}
        />
      )}
    </footer>
  );
}
