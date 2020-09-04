import styled from "styled-components";
import { colors, dimensions } from "../constants";

export const SectionDiv = styled.div`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${dimensions.fontSize * 0.75}px;
  margin: 0 ${dimensions.spacing * 4}px;
  padding: ${dimensions.spacing * 4}px;
  box-shadow: 0px 0px 20px 5px #ffffff;
  height: 100%;
`;

export const MovieContainerDiv = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  margin: ${dimensions.spacing * 4}px;
  padding: ${dimensions.spacing * 4}px;
  box-sizing: border-box;
  border: ${(props) =>
    props.isInNominations && !props.isNominations
      ? `3px solid ${colors.mainColor}`
      : ""};
  border-radius: ${dimensions.fontSize * 0.75}px;
`;

export const NominationButton = styled.button`
  color: ${(props) => props.fontColor};
  font-size: ${dimensions.spacing * 4}px;
  font-weight: 600;
  border-radius: ${dimensions.fontSize * 0.75}px;
  border: none;
  margin: 0 ${dimensions.spacing * 2}px;
  padding: ${dimensions.spacing * 2}px;
  cursor: pointer;
`;

export const PosterImage = styled.img`
  height: 167px;
  width: 113px;
  border-radius: ${dimensions.fontSize * 0.5}px;
`;

export const BodyContainer = styled.div`
    display: flex,
    flex: 5,
    justifyContent: space-between,
    margin: ${dimensions.spacing * 80}px auto,
    maxWidth: 1300px,
    width: 100%,
`;

export const NominationsFooter = styled.footer`
  background-color: ${colors.lighterColor};
  position: sticky;
  bottom: 0;
  border-radius: ${dimensions.fontSize * 0.75}px ${dimensions.fontSize * 0.75}px
    0 0;
  overflow-y: hidden;
`;
