import "jest-styled-components";

import * as React from "react";

import { replacer, reviver } from "../lib/JSONHelper";

import App from "../App";
import { render } from "@testing-library/react";

describe("App tests", () => {
  const KEY = "shopify_the_shoppies_nominations";
  const useEffect = jest.spyOn(React, "useEffect");

  beforeEach(async () => {
    await localStorage.clear();
  });

  test("checks if title is being rendered", async () => {
    const { getByTestId } = render(<App />);

    const appTitle = await getByTestId("app-title");

    expect(appTitle).toBeInTheDocument();
  });

  test("mock local storage does NOT have nominations", () => {
    const str = JSON.stringify(new Map(), replacer);

    localStorage.setItem(KEY, str);

    expect(localStorage.getItem(KEY)).toBe(str);
  });

  test("mock local storage has nominations", () => {
    const nominations = {
      dataType: "Map",
      value: [
        [
          "tt0371746",
          {
            Title: "Iron Man",
            Year: "2008",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
            imdbID: "tt0371746",
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
      ],
    };

    localStorage.setItem(KEY, JSON.stringify(nominations));

    expect(localStorage.getItem(KEY)).toBe(JSON.stringify(nominations));
  });

  test("testing reviver function", () => {
    const nominations = {
      dataType: "Map",
      value: [
        [
          "tt0371746",
          {
            Title: "Iron Man",
            Year: "2008",
            Poster:
              "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
            imdbID: "tt0371746",
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
      ],
    };

    const revivedObject = reviver(KEY, nominations);

    expect([...revivedObject.keys()]).toEqual(["tt0371746", "tt1228705"]);
  });

  test("test useEffect hook", () => {
    // const mockUseEffect = jest
    //   .spyOn(React, "useEffect")
    //   .mockImplementation((f) => f());

    // mockUseEffect();
    // mockUseEffect(); //
    useEffect.mockImplementation(() => {});
  });

  // test("Hover button should show if the nominations section isn't in view anymore", async () => {
  //   global.innerHeight = 700;
  //   const { getByTestId } = component;

  //   const HoverButton = await getByTestId("hover-button");

  //   console.log(HoverButton);

  //   expect(HoverButton).toBeInTheDocument();
  // });
});
