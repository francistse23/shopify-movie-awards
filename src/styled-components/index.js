import styled from "styled-components";
import { colors, dimensions } from "../constants";

export const AppBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${dimensions.spacing * 16}px auto;
  max-width: 1300px;
  width: 100%;
`;

export const AppTitle = styled.h1`
  font-size: ${dimensions.fontSize * 4}px;
  line-height: ${dimensions.fontSize * 4.5}px;
  font-family: Architects Daughter, cursive;
  text-transform: uppercase;
`;

export const SectionDiv = styled.div`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${dimensions.fontSize * 0.75}px;
  margin: 0 ${dimensions.spacing * 4}px;
  padding: ${dimensions.spacing * 4}px;
  box-shadow: 0px 0px 20px 5px ${colors.lighterColor};
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

export const MovieDiv = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  margin: 0 ${dimensions.spacing * 2}px;
`;

export const MovieDetailsDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  width: 100%;
`;

export const MoviePosterDiv = styled.div`
  flex: 1;
  justify-content: center;
`;

export const MovieTitle = styled.p`
  font-size: ${dimensions.fontSize * 1.5}px;
  font-weight: 500;
`;

export const SearchBarDiv = styled.div`
  background-color: ${colors.sectionBackground};
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: ${dimensions.spacing * 4}px auto;
  padding: ${dimensions.spacing * 8}px;
  border-radius: ${dimensions.fontSize * 0.75}px;
  box-shadow: 0px 0px 20px 5px ${colors.lighterColor};
`;

export const SearchBarInput = styled.input`
  border: none;
  border-radius: ${dimensions.fontSize * 0.75}px;
  padding: ${dimensions.fontSize}px;
  flex: 3;
  font-size: ${dimensions.fontSize * 1.1}px;
  background-color: ${colors.lighterColor};
`;

export const SectionTitle = styled.h2`
  font-size: ${dimensions.fontSize * 2}px;
  font-weight: 700;
`;
