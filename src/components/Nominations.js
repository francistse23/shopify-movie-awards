import { SectionDiv, SectionTitle } from "../styled-components";

import { CSSTransitionGroup } from "react-transition-group";
import React from "react";
import { colors } from "../constants";

export default function Nominations({ nominations }) {
  return (
    <SectionDiv backgroundColor={colors.mainColor} id="nominations">
      <SectionTitle>
        Your Nominations{" "}
        <span aria-label="trophy" role="img">
          🏆
        </span>
      </SectionTitle>

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
