import "./NominationsBanner.css";

import { NominationsFooter, Subtitle } from "../styled-components";

import { CSSTransitionGroup } from "react-transition-group";
import React from "react";

export default function NominationsBanner({ nominations }) {
  return (
    <CSSTransitionGroup
      transitionName="nominations-footer"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
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
