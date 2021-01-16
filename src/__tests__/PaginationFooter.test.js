import "jest-styled-components";

import * as React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import PaginationFooter from "../components/PaginationFooter";
import SearchResults from "../components/SearchResults";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("PaginationFooter component tests", () => {
  const setPage = jest.fn();
  const setNominations = jest.fn();
  const nominations = new Map([
    [
      "tt0371746",
      {
        Title: "Iron Man",
        Year: "2008",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
        imdbID: "tt0371746",
        Ratings: [
          { Source: "Internet Movie Database", Value: "7.9/10" },
          { Source: "Rotten Tomatoes", Value: "94%" },
          { Source: "Metacritic", Value: "79/100" },
        ],
      },
    ],
    [
      "tt1228705",
      {
        Title: "Iron Man 2",
        Year: "2010",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg",
        imdbID: "tt1228705",
      },
    ],
  ]);
  const queryClient = new QueryClient();
  let page;

  beforeEach(() => {
    setPage.mockClear();
    setNominations.mockClear();

    page = 1;
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  test("Previous Page Button rendering, page = 2", async () => {
    page = 2;
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SearchResults
          typing=""
          inputText=""
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
        <PaginationFooter page={page} setPage={setPage} totalResults={79} />
      </QueryClientProvider>
    );

    const prevPageButton = await getByRole("button", { name: "previous page" });

    userEvent.click(prevPageButton);

    expect(setPage).toHaveBeenCalledWith(1);
  });

  test("Previous Page Button should NOT render, page = 1", async () => {
    const { queryByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SearchResults
          typing=""
          inputText=""
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
        <PaginationFooter page={page} setPage={setPage} totalResults={79} />
      </QueryClientProvider>
    );

    const prevPageButton = await queryByRole("button", {
      name: "previous page",
    });

    expect(prevPageButton).toBeNull();
  });

  test("Next Page Button rendering, page = 2", async () => {
    page = 2;
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SearchResults
          typing=""
          inputText=""
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
        <PaginationFooter page={page} setPage={setPage} totalResults={79} />
      </QueryClientProvider>
    );

    const nextPageButton = await getByRole("button", { name: "next page" });

    userEvent.click(nextPageButton);

    expect(setPage).toHaveBeenCalledWith(3);
  });

  test("Next Page Button should NOT render, page = 8", async () => {
    page = 8;
    const { queryByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SearchResults
          typing=""
          inputText=""
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
        <PaginationFooter page={page} setPage={setPage} totalResults={79} />
      </QueryClientProvider>
    );

    const nextPageButton = await queryByRole("button", {
      name: "next page",
    });

    expect(nextPageButton).toBeNull();
  });

  test("should be 3 placeholders on screen if last page is reached", async () => {
    page = 8;
    const { queryAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <SearchResults
          typing=""
          inputText=""
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
        <PaginationFooter page={page} setPage={setPage} totalResults={79} />
      </QueryClientProvider>
    );

    const placeholderButtons = await queryAllByTestId("placeholder-button");

    expect(placeholderButtons).toHaveLength(3);
  });

  test("take user to page if they clicked on a page button", async () => {
    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <SearchResults
          typing=""
          inputText=""
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />
        <PaginationFooter page={page} setPage={setPage} totalResults={79} />
      </QueryClientProvider>
    );

    const button = await getByRole("button", { name: "navigate to page 4" });
    userEvent.click(button);

    expect(setPage).toHaveBeenCalledWith(4);
  });
});
