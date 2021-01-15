import "jest-styled-components";

import * as React from "react";

import Movie, {
  addToNominations,
  removeFromNominations,
} from "../components/Movie";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

describe("Movie component tests", () => {
  const KEY = "shopify_the_shoppies_nominations";
  let nominations;
  let movie;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
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

  beforeEach(async () => {
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

    localStorage.setItem(KEY, JSON.stringify(nominations));

    movie = nominations.get("tt0371746");

    component = await render(
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

  describe("If Movie isNominations=true", () => {
    test("renders Movie component (isNominations)", async () => {
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

      const { queryByText } = component;

      const button = queryByText(/Nominate/);

      expect(button).toBeNull();
    });

    test("Placeholder image should display if poster path is N/A", async () => {
      await component.rerender(
        <Movie
          nominations={nominations}
          Title={newMovie.Title}
          Year={newMovie.Year}
          Poster="N/A"
          imdbID={newMovie.imdbID}
          setNominations={setState}
          isNominations={true}
        />
      );

      const { getByAltText } = component;
      const placeholderImage = await getByAltText(
        "Poster unavailable at this time"
      );

      expect(placeholderImage).toBeInTheDocument();
    });

    test("Nomination button should not be on screen after adding movie to nominations", async () => {
      await component.rerender(
        <Movie
          nominations={nominations}
          Title={newMovie.Title}
          Year={newMovie.Year}
          Poster={newMovie.Poster}
          imdbID={newMovie.imdbID}
          setNominations={setState}
          isNominations={true}
        />
      );

      const { queryByText } = component;

      const button = queryByText(/Nominate/);

      expect(button).not.toBeInTheDocument();
    });

    test("Simulate remove nomination click", async () => {
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

      const { getByTestId } = component;
      const removeNominationButton = await getByTestId("remove-nomination");
      userEvent.click(removeNominationButton);

      expect(setState).toHaveBeenCalled();
    });
  });

  describe("If Movie isNominations=false", () => {
    test("renders Movie component (is not nominations)", () => {
      const { queryByText } = component;

      const button = queryByText(/Nominate/);

      expect(button).toBeInTheDocument();
    });

    test("Placeholder image should display if poster path is N/A", async () => {
      await component.rerender(
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

      const { getByAltText } = component;
      const placeholderImage = await getByAltText(
        "Poster unavailable at this time"
      );

      expect(placeholderImage).toBeInTheDocument();
    });

    test("Nomination button should not be on screen after adding movie to nominations", async () => {
      await component.rerender(
        <Movie
          nominations={nominations}
          Title={newMovie.Title}
          Year={newMovie.Year}
          Poster={newMovie.Poster}
          imdbID={newMovie.imdbID}
          setNominations={setState}
          isNominations={false}
        />
      );

      const { queryByText } = component;

      const button = queryByText(/Nominate/);

      expect(button.getAttribute("disabled")).toBeNull();

      userEvent.click(button);

      await component.rerender(
        <Movie
          nominations={nominations}
          Title={newMovie.Title}
          Year={newMovie.Year}
          Poster={newMovie.Poster}
          imdbID={newMovie.imdbID}
          setNominations={setState}
          isNominations={true}
        />
      );

      expect(button).not.toBeInTheDocument();

      expect(setState).toHaveBeenCalledTimes(1);
    });

    test("3 movie ratings rendered", async () => {
      const { getAllByTestId } = component;
      const ratings = await getAllByTestId(/[-ratings]/gi);
      // RTL not cleaning up properly
      ratings.shift();

      expect(ratings).toHaveLength(3);
    });

    test("Simulate remove nomination click", async () => {
      const { getByTestId } = component;
      const removeNominationButton = await getByTestId("remove-nomination");
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
