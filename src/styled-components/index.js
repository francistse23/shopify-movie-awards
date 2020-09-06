import styled from "styled-components";
import { colors, device, dimensions, screenSize } from "../constants";

export const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: ${dimensions.spacing * 4}px auto;
  padding: 0 ${dimensions.spacing}px;
  width: 100%;

  @media ${device.tablet} {
    max-width: 600px;
  }

  @media ${device.laptopL} {
    max-width: 1300px;
  }
`;

export const AppMain = styled.div`
  color: ${colors.darkColor};
  display: flex;
  flex: 2;
  font-family: sans-serif;
  height: 100%;
  // min-height: 100vh;
  padding: 0;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  max-width: ${screenSize.mobileS};
  width: 100%;

  @media ${device.mobileM} {
    max-width: ${screenSize.mobileM};
  }

  @media ${device.mobileL} {
    max-width: ${screenSize.mobileL};
  }

  @media ${device.tablet} {
    max-width: ${screenSize.tablet};
  @media ${device.laptop} {
    max-width: ${screenSize.laptop};
  @media ${device.laptopL} {
    max-width: 1200px;
  }
`;

export const AppTitle = styled.h1`
  font-family: Architects Daughter, cursive;
  font-size: ${dimensions.fontSize * 2.5}px;
  line-height: ${dimensions.fontSize * 4.5}px;
  padding: 0 ${dimensions.spacing * 2}px;
  text-align: center;
  text-transform: uppercase;

  @media ${device.tablet} {
    font-size: ${dimensions.fontSize * 4}px;
  }
`;

export const BodyContainer = styled.div`
    display: flex,
    flex: 5,
    justifyContent: space-between,
    margin: ${dimensions.spacing * 80}px auto,
    maxWidth: 1300px,
    width: 100%,
`;

export const MovieContainerDiv = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  justify-content: space-around;
  margin: ${dimensions.spacing * 2}px;
  padding: ${dimensions.spacing * 2}px ${dimensions.spacing * 6}px;
  box-sizing: border-box;
  border: ${(props) =>
    props.isInNominations && !props.isNominations
      ? `3px solid ${colors.mainColor}`
      : ""};
  border-radius: ${dimensions.fontSize * 0.75}px;
  overflow-y: hidden;
  max-height: 200px;
  width: 90%;
`;

export const MovieDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  width: 100%;
`;

export const MoviePosterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MovieTitle = styled.h3`
  font-size: ${dimensions.fontSize * 0.9}px;
`;

export const NominationButton = styled.button`
  color: ${(props) => props.fontColor};
  flex: 1;
  font-size: ${dimensions.fontSize * 0.75}px;
  font-weight: 600;
  border-radius: ${dimensions.fontSize * 0.75}px;
  border: none;
  margin: ${dimensions.spacing * 2}px;
  padding: ${dimensions.spacing * 2}px;
  cursor: pointer;
`;

export const NominationButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const NominationsFooter = styled.footer`
  background-color: ${colors.lighterColor};
  border-radius: ${dimensions.fontSize * 0.75}px ${dimensions.fontSize * 0.75}px
    0 0;
  overflow-y: hidden;
`;

export const PageButton = styled.button`
  width: 20%;
  color: ${colors.lighterColor};
  border: none;
  flex: 1;
  border-radius: ${dimensions.fontSize * 0.25}px;
  padding: ${dimensions.spacing}px;
  background-color: ${(props) =>
    props.page === props.element ? colors.mainColor : colors.sectionBackground};
`;

export const PaginationButton = styled.button`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background-color: ${colors.sectionBackground};
  border: none;
  border-radius: ${dimensions.fontSize * 0.25}px;
  color: ${colors.lighterColor};
`;

export const PosterImage = styled.img`
  height: 150px;
  width: 102px;
  border-radius: ${dimensions.fontSize * 0.5}px;

  // height: 167px;
  // width: 113px;
`;

export const SearchBarDiv = styled.div`
  background-color: ${colors.sectionBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: ${dimensions.spacing * 2}px;
  padding: ${dimensions.spacing * 4}px ${dimensions.spacing * 6}px;
  border-radius: ${dimensions.fontSize * 0.75}px;
  box-shadow: 0px 0px 20px 5px ${colors.lighterColor};

  @media ${device.laptop} {
    margin: ${dimensions.spacing * 4}px;
    padding: ${dimensions.spacing * 8}px;
  } ;
`;

export const SearchBarInput = styled.input`
  border: none;
  border-radius: ${dimensions.fontSize * 0.75}px;
  padding: ${dimensions.spacing * 4}px;
  flex: 3;
  font-size: ${dimensions.fontSize * 1.1}px;
  background-color: ${colors.lighterColor};
`;

export const SectionDiv = styled.div`
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${dimensions.fontSize * 0.75}px;
  box-shadow: 0px 0px 20px 5px ${colors.lighterColor};
  margin: ${dimensions.spacing * 2}px;
  padding: 0 ${dimensions.spacing * 2}px;

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  height: ${(props) => props.height}px;
  overflow-x: auto;
  width: auto;
`;

export const SectionTitle = styled.h2`
  font-size: ${dimensions.fontSize * 1.5}px;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  font-size: ${dimensions.fontSize * 1.25}px;
  font-weight: 500;
`;
