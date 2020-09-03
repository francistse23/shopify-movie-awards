import styled from "styled-components";
import { colors } from "../constants";

export const SectionDiv = styled.div`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 12px;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: 0px 0px 20px 5px #ffffff;
  height: 100%;
`;

export const MovieContainerDiv = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  margin: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  border: ${(props) =>
    props.isInNominations && !props.isNominations
      ? `3px solid ${colors.secondaryColor}`
      : ""};
  border-radius: 12px;
`;
