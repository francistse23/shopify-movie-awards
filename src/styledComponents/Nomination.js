import { colors, device, dimensions } from "../constants";

import styled from "styled-components";

export const NominationButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? colors.disabledColor : colors.mainColor};
  border: none;
  border-radius: ${dimensions.fontSize * 0.75}px;
  color: ${(props) =>
    props.disabled ? colors.secondaryColor : colors.darkColor};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 600;
  margin: ${dimensions.spacing * 2}px 0;
  padding: ${dimensions.spacing * 2}px ${dimensions.spacing * 4}px;
  width: 100%;

  :hover {
    background-color: ${(props) => !props.disabled && colors.lightColor};
  }

  @media ${device.mobileS} {
    font-size: ${dimensions.fontSize * 0.65}px;
  }
  @media ${device.laptop} {
    font-size: ${dimensions.fontSize * 0.75}px;
  }
  @media ${device.desktop} {
    font-size: ${dimensions.fontSize * 0.85}px;
  }
`;

export const NominationButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;

  @media ${device.laptop} {
    flex: 1;
  }
`;

export const NominationsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: ${dimensions.spacing * 4}px 0;
  width: 100%;
`;

export const NominationsFooter = styled.footer`
  align-items: center;
  background-color: ${colors.lighterColor};
  border-radius: ${dimensions.fontSize}px ${dimensions.fontSize}px 0 0;
  bottom: 0;
  position: fixed;
  overflow-y: hidden;
  width: 100%;

  &.nominations-footer-enter {
    max-height: 0;
  }

  &.nominations-footer-enter-active {
    max-height: 65px;
  }

  &.nominations-footer-exit {
    max-height: 65px;
  }

  &.nominations-footer-exit-active {
    max-height: 0;
  }

  &.nominations-footer-enter-active,
  &.nominations-footer-exit-active {
    transition: max-height 300ms ease-in;
  }
`;
