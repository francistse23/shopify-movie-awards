import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { Subtitle, NominationsFooter } from "../styled-components";

import "./NominationsBanner.css";

export default function NominationsBanner({ nominations }) {
  return (
    <CSSTransitionGroup
      transitionName="nominations-footer"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      style={{
        position: "sticky",
        bottom: 0,
      }}
    >
      {nominations.size === 5 && (
        <NominationsFooter key="nominations-footer">
          <Subtitle style={{ fontWeight: "600" }}>
            You have made all 5 nominations!{" "}
            <span aria-label="nominations" role="img">
              🏆
            </span>
          </Subtitle>
        </NominationsFooter>
      )}
    </CSSTransitionGroup>
  );
}
