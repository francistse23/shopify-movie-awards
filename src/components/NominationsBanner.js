import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { dimensions } from "../constants";
import { NominationsFooter } from "../styled-components";

import "./NominationsBanner.css";

export default function NominationsBanner({ nominations }) {
  return (
    <CSSTransitionGroup
      transitionName="nominations-footer"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {nominations.size === 5 && (
        <NominationsFooter key="nominations-footer">
          <p
            style={{
              fontSize: `${dimensions.fontSize * 2}px`,
              fontWeight: "700",
              lineHeight: "5vh",
              height: "5vh",
            }}
          >
            You have made all 5 nominations!{" "}
            <span aria-label="nominations" role="img">
              🏆
            </span>
          </p>
        </NominationsFooter>
      )}
    </CSSTransitionGroup>
  );
}
