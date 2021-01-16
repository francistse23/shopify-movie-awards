import "jest-styled-components";

import * as React from "react";

import Movie, {
  addToNominations,
  removeFromNominations,
} from "../components/Movie";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Movie component tests", () => {
  let nominations = new Map([
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
    ]),
    movie = nominations.get("tt0371746");
  let setState = jest.fn(),
    useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);
  let component;

  const newMovie = {
    Plot:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    Ratings: [
      { Source: "Internet Movie Database", Value: "8.0/10" },
      { Source: "Rotten Tomatoes", Value: "91%" },
      { Source: "Metacritic", Value: "69/100" },
    ],
    Title: "The Avengers",
    Year: "2012",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    imdbID: "tt0848228",
  };

  describe("If Movie isNominations=true", () => {
    beforeEach(() => {
      setState.mockClear();
      component = render(
        <Movie
          nominations={nominations}
          Ratings={movie.Ratings}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          imdbID={movie.imdbID}
          setNominations={setState}
          isNominations={true}
        />
      );
    });

    test("renders Movie component", async () => {
      const { queryByText } = component;

      const button = queryByText(/Nominate/);

      expect(button).toBeNull();
    });

    test("Placeholder image should display if poster path is N/A", async () => {
      const { getByAltText } = render(
        <Movie
          nominations={nominations}
          Ratings={movie.Ratings}
          Title={movie.Title}
          Year={movie.Year}
          Poster="N/A"
          imdbID={movie.imdbID}
          setNominations={setState}
          isNominations={true}
        />
      );

      const placeholderImage = await getByAltText(
        "Poster unavailable at this time"
      );

      expect(placeholderImage).toBeInTheDocument();
    });

    test("Nomination button should not be on screen after adding movie to nominations", async () => {
      const { queryByText } = component;

      const button = queryByText(/Nominate/);

      expect(button).not.toBeInTheDocument();
    });

    test("Simulate remove nomination click", async () => {
      const { getByRole } = component;

      const removeNominationButton = await getByRole("button", {
        name: "Remove from nomination",
      });
      userEvent.click(removeNominationButton);

      expect(setState).toHaveBeenCalled();
    });
  });

  describe("If Movie isNominations=false", () => {
    beforeEach(() => {
      setState.mockClear();

      nominations = new Map([
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

      movie = nominations.get("tt0371746");

      component = render(
        <Movie
          nominations={nominations}
          Ratings={movie.Ratings}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          imdbID={movie.imdbID}
          setNominations={setState}
          isNominations={false}
        />
      );
    });

    test("renders Movie component", () => {
      const { queryByText } = component;

      const button = queryByText(/Nominate/);

      expect(button).toBeInTheDocument();
    });

    test("Placeholder image should display if poster path is N/A", async () => {
      const { getByAltText } = render(
        <Movie
          nominations={nominations}
          Title={newMovie.Title}
          Year={newMovie.Year}
          Poster="N/A"
          imdbID={newMovie.imdbID}
          setNominations={setState}
          isNominations={false}
        />
      );
      const placeholderImage = await getByAltText(
        "Poster unavailable at this time"
      );

      expect(placeholderImage).toBeInTheDocument();
    });

    test("3 movie ratings rendered", async () => {
      const { getAllByAltText } = component;

      const ratings = await getAllByAltText(/Icon/);

      expect(ratings).toHaveLength(3);
    });

    test("Nomination button should not be on screen after adding movie to nominations", async () => {
      nominations = new Map([
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

      const { getByRole } = component;

      const button = getByRole("button", { name: "Add to nomination" });

      expect(button.getAttribute("disabled")).toBe("");

      userEvent.click(button);

      await component.rerender(
        <Movie
          nominations={nominations}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          imdbID={movie.imdbID}
          setNominations={setState}
          isNominations={true}
        />
      );

      expect(button).not.toBeInTheDocument();
    });

    test("Simulate remove nomination click", async () => {
      const { getByRole } = component;

      const removeNominationButton = await getByRole("button", {
        name: "Remove from nomination",
      });

      userEvent.click(removeNominationButton);

      expect(setState).toHaveBeenCalled();
    });
  });

  test("Adding movie to nominations", () => {
    const newNominations = addToNominations(
      newMovie.Title,
      newMovie.Year,
      newMovie.Poster,
      newMovie.imdbID,
      nominations
    );

    expect(newNominations.has(newMovie.imdbID)).toBeTruthy();
  });

  test("Removing movie to nominations", () => {
    const newNominations = removeFromNominations(movie.imdbID, nominations);

    expect(newNominations.has(movie.imdbID)).toBeFalsy();
  });
});
