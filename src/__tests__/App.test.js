import "jest-styled-components";

import * as React from "react";

import App, { searchMovies } from "../App";
import { replacer, reviver } from "../lib/JSONHelper";

import { render } from "@testing-library/react";

describe("App tests", () => {
  const KEY = "shopify_the_shoppies_nominations";

  const resolvedObject = {
    Search: [
      {
        Title: "Iron Man",
        Year: "2008",
        Rated: "PG-13",
        Released: "02 May 2008",
        Runtime: "126 min",
        Genre: "Action, Adventure, Sci-Fi",
        Director: "Jon Favreau",
        Writer:
          "Mark Fergus (screenplay), Hawk Ostby (screenplay), Art Marcum (screenplay), Matt Holloway (screenplay), Stan Lee (characters), Don Heck (characters), Larry Lieber (characters), Jack Kirby (characters)",
        Actors:
          "Robert Downey Jr., Terrence Howard, Jeff Bridges, Gwyneth Paltrow",
        Plot:
          "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        Language: "English, Persian, Urdu, Arabic, Kurdish, Hindi, Hungarian",
        Country: "USA, Canada",
        Awards: "Nominated for 2 Oscars. Another 22 wins & 70 nominations.",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
        Ratings: [
          { Source: "Internet Movie Database", Value: "7.9/10" },
          { Source: "Rotten Tomatoes", Value: "94%" },
          { Source: "Metacritic", Value: "79/100" },
        ],
        Metascore: "79",
        imdbRating: "7.9",
        imdbVotes: "935,798",
        imdbID: "tt0371746",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$319,034,126",
        Production: "Marvel Enterprises, Paramount",
        Website: "N/A",
        Response: "True",
      },
      {
        Title: "Iron Man 3",
        Year: "2013",
        Rated: "PG-13",
        Released: "03 May 2013",
        Runtime: "130 min",
        Genre: "Action, Adventure, Sci-Fi",
        Director: "Shane Black",
        Writer:
          'Drew Pearce (screenplay by), Shane Black (screenplay by), Stan Lee (based on the Marvel comic book by), Don Heck (based on the Marvel comic book by), Larry Lieber (based on the Marvel comic book by), Jack Kirby (based on the Marvel comic book by), Warren Ellis (based on the "Extremis" mini-series written by), Adi Granov (based on the "Extremis" mini-series illustrated by)',
        Actors: "Robert Downey Jr., Gwyneth Paltrow, Don Cheadle, Guy Pearce",
        Plot:
          "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
        Language: "English",
        Country: "USA",
        Awards: "Nominated for 1 Oscar. Another 20 wins & 62 nominations.",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg",
        Ratings: [
          { Source: "Internet Movie Database", Value: "7.1/10" },
          { Source: "Rotten Tomatoes", Value: "79%" },
          { Source: "Metacritic", Value: "62/100" },
        ],
        Metascore: "62",
        imdbRating: "7.1",
        imdbVotes: "753,038",
        imdbID: "tt1300854",
        Type: "movie",
        DVD: "N/A",
        BoxOffice: "$409,013,994",
        Production: "Marvel Studios",
        Website: "N/A",
        Response: "True",
      },
    ],
    totalResults: "79",
    Response: "True",
  };

  beforeEach(async () => {
    await localStorage.clear();
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(resolvedObject),
    })
  );

  test("checks if title is being rendered", async () => {
    const { getByText } = render(<App />);

    const appTitle = await getByText("The Shoppies");

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

  test("Search movie function should return 79 movies with the search term 'iron man' and at page '1'", async () => {
    const results = await searchMovies("iron man", 1);

    expect(results.totalResults).toBe("79");
  });
});
