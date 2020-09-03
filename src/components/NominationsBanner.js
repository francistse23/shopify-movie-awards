import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

export default function NominationsBanner({ nominations }) {
  return (
    <CSSTransitionGroup
      transitionName="nominations-footer"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {nominations.size === 5 && (
        <footer
          key="nominations-footer"
          style={{
            backgroundColor: "white",
            position: "sticky",
            bottom: 0,
            lineHeight: "10vh",
            height: "10vh",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <h1>
            You have made all 5 nominations!{" "}
            <span aria-label="nominations" role="img">
              🏆
            </span>
          </h1>
        </footer>
      )}
    </CSSTransitionGroup>
  );
}
