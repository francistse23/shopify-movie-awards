import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import Movie from "./Movie";
import { SectionDiv } from "../styled-components";
import { colors } from "../constants";

export default function Nominations({ nominations, setNominations }) {
  return (
    <SectionDiv backgroundColor={colors.sectionBackground} flex={2}>
      <h3 style={{ fontSize: "2rem" }}>
        Your Nominations{" "}
        <span aria-label="trophy" role="img">
          🏆
        </span>
      </h3>

      <CSSTransitionGroup
        transitionName="movies"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {[...nominations.values()].map(({ Title, Year, Poster, imdbID }) => (
          <Movie
            key={imdbID}
            Title={Title}
            Year={Year}
            Poster={Poster}
            imdbID={imdbID}
            nominations={nominations}
            setNominations={setNominations}
            isNominations={true}
          />
        ))}
      </CSSTransitionGroup>

      {nominations.size === 0 && (
        <CSSTransitionGroup
          transitionName="movies"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <p key="no-nominations">
            You don't have any nominations for The Shoppies yet.
          </p>
          <p key="max-nominations">You can add at most 5 nominations</p>
        </CSSTransitionGroup>
      )}
    </SectionDiv>
  );
}
