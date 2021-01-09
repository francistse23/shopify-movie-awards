import "./NominationsBanner.css";

import { NominationsFooter, Subtitle } from "../styled-components";

import React from "react";
import { TransitionGroup } from "react-transition-group";

export default function NominationsBanner({ nominations }) {
  return (
    <TransitionGroup
      transitionName="nominations-footer"
      timeout={500}
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
    </TransitionGroup>
  );
}
