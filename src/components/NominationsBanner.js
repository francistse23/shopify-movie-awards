import * as SC from "../styled-components";

import { CSSTransition } from "react-transition-group";
import React from "react";

const { NominationsFooter, Subtitle } = SC;

export default function NominationsBanner({ numOfNominations }) {
  return (
    <CSSTransition
      in={numOfNominations === 5}
      timeout={500}
      unmountOnExit
      classNames="nominations-footer"
    >
      <NominationsFooter>
        <Subtitle style={{ fontWeight: "600" }}>
          You have made all 5 nominations!{" "}
          <span aria-label="nominations" role="img">
            🏆
          </span>
        </Subtitle>
      </NominationsFooter>
    </CSSTransition>
  );
}
