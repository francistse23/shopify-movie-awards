import { colors, device, dimensions, screenSize } from "../constants";

import styled from "styled-components";

export const AppMain = styled.div`
  box-sizing: border-box;
  color: ${colors.fontColor};
  display: flex;
  flex: 1;
  font-family: Roboto Mono;
  height: 100%;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  // max-width: ${screenSize.mobileS};
  width: 100%;

  // @media ${device.mobileM} {

  // }

  // @media ${device.mobileL} {

  // }

  @media ${device.tablet} {
    padding-bottom: 8%;
  }

  @media ${device.laptop} {
    padding-bottom: 5%;
  }

  @media ${device.laptopL} {
    padding-bottom: 10%;
  }
`;

export const AppTitle = styled.h1`
  font-family: Quicksand;
  font-size: ${dimensions.fontSize * 2.5}px;
  line-height: ${dimensions.fontSize * 4.5}px;
  padding: 0 ${dimensions.spacing * 2}px;
  text-align: center;
  text-transform: uppercase;

  @media ${device.tablet} {
    font-size: ${dimensions.fontSize * 4}px;
  }
`;

export const FooterContainer = styled.footer`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: ${dimensions.spacing * 4}px auto;
  padding: ${dimensions.spacing * 4}px 0;
  width: 50%;

  @media ${device.laptop} {
    width: 30%;
  }
`;

export const HoverButton = styled.button`
  background-color: ${colors.mainColor};
  border: none;
  border-radius: 50%;
  bottom: 5%;
  cursor: pointer;
  padding: 1%;
  position: fixed;
  right: 2.5%;
  outline-style: none;

  :hover {
    box-shadow: 0 0 5px 5px ${colors.lighterColor};
  }
`;

export const MovieContainerDiv = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.isNominations ? colors.secondaryColor : "none"};
  border: ${(props) =>
    props.isInNominations ? `2px solid ${colors.lightColor}` : "none"};
  border-radius: ${dimensions.fontSize * 0.75}px;
  box-sizing: border-box;
  box-shadow: ${(props) =>
    props.isNominations
      ? `0px 0px 10px 5px ${colors.secondaryColor}`
      : props.isInNominations
      ? `0px 0px 10px 5px ${colors.lightColor}`
      : "none"};
  display: flex;
  // flex: 0 0 ${(props) => (props.isNominations ? 17 : 45)}%;
  flex-direction: ${(props) => (props.isNominations ? "column" : "row")};
  justify-content: space-between;
  margin: 0 ${dimensions.spacing * 20}px;
  overflow-y: hidden;
  padding: ${dimensions.spacing}px ${dimensions.spacing * 4}px;

  @media ${device.tablet} {
    flex: 0 0 ${(props) => (props.isNominations ? 25 : 13)}%;
    margin: ${dimensions.spacing * 6}px;
    padding: ${dimensions.spacing}px ${dimensions.spacing * 4}px;
  }

  @media ${device.laptop} {
    flex: 0 0 ${(props) => (props.isNominations ? 30 : 50)}%;
    margin: ${dimensions.spacing * 4}px;
  }

  @media ${device.laptopL} {
    flex: 0 0 ${(props) => (props.isNominations ? 17 : 40)}%;
    padding: ${dimensions.spacing * 3}px ${dimensions.spacing * 6}px;
  }
`;

export const MovieDetailsDiv = styled.div`
  align-items: ${(props) => (props.isNominations ? "center" : "")};
  display: flex;
  flex-direction: ${(props) => (props.isNominations ? "row" : "column")};
  height: 100%;
  justify-content: space-between;
  padding: 0 2.5%;
`;

export const MoviePlot = styled.p`
  font-size: ${Math.ceil(dimensions.fontSize * 0.85)}px;
  text-align: justify;
`;

export const MoviePosterDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: ${dimensions.spacing * 6}px;
`;

export const MovieRating = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${dimensions.spacing * 2}px 0;
`;

export const MovieRatings = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 50%;

  @media ${device.tablet} {
    width: 70%;
  }
`;

export const MovieTitle = styled.h3`
  font-size: ${dimensions.fontSize * 0.75}px;

  @media ${device.laptop} {
    font-size: ${(props) =>
      props.isNominations
        ? dimensions.fontSize * 0.9
        : dimensions.fontSize * 1.25}px;
  }
`;

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
  background-color: ${colors.lighterColor};
  border-radius: ${dimensions.fontSize * 0.75}px ${dimensions.fontSize * 0.75}px
    0 0;
  overflow-y: hidden;
`;

export const PageButton = styled.button`
  background-color: ${(props) =>
    props.page === props.pageNumber ? colors.mainColor : colors.secondaryColor};
  color: ${colors.darkColor};
  cursor: pointer;
  border: 1px solid ${colors.darkColor};
  border-radius: ${dimensions.fontSize * 0.25}px;
  flex: 0 0 10%;
  padding: ${dimensions.spacing}px;

  :hover {
    background-color: ${colors.lighterColor};
  }
`;

export const PaginationButton = styled.button`
  background-color: ${colors.secondaryColor};
  border: none;
  border-radius: ${dimensions.fontSize * 0.25}px;
  color: ${colors.darkColor};
  cursor: pointer;
  display: flex;
  flex: 0 0 10%;
  font-weight: 700;
  justify-content: center;
  padding: ${dimensions.spacing}px;

  :hover {
    background-color: ${colors.lighterColor};
  }
`;

export const PosterImage = styled.img`
  height: ${(props) => (props.nominated ? "75px" : "150px")};
  width: ${(props) => (props.nominated ? "51px" : "102px")};
  border-radius: ${dimensions.fontSize * 0.5}px;

  @media ${device.tablet} {
    height: ${(props) => (props.nominated ? "75px" : "224px")};
    width: ${(props) => (props.nominated ? "50px" : "150px")};
  }

  @media${device.laptop} {
    height: ${(props) => (props.nominated ? "112px" : "336px")};
    width: ${(props) => (props.nominated ? "75px" : "225px")};
  }
`;

export const SearchBarContainer = styled.div`
  background-color: ${colors.secondaryColor};
  display: flex;
  flex-direction: column;
  padding: ${dimensions.spacing * 4}px 20%;
`;

export const SearchBarInput = styled.input`
  background-color: ${colors.lighterColor};
  border: none;
  border-radius: ${dimensions.fontSize * 0.75}px;
  font-size: ${dimensions.fontSize * 1.1}px;
  padding: ${dimensions.spacing * 4}px;
`;

export const SectionDiv = styled.section`
  align-items: center;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : colors.secondaryColor};
  display: flex;
  flex-direction: column;
  position: relative;

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: ${dimensions.fontSize * 0.75}px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.secondaryColor};
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.lighterColor};
    border-radius: ${dimensions.fontSize * 0.75}px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.darkerColor};
  }

  @media ${device.mobileL} {
    // padding: 0 ${dimensions.spacing * 4}px;
  }

  @media ${device.tablet} {
    height: ${(props) => props.height}px;
    // padding: 0 ${dimensions.spacing * 8}px;
  }

  @media ${device.laptop} {
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    // padding: 0 ${dimensions.spacing * 4}px;
    width: 100%;
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${dimensions.fontSize * 1.5}px;
  font-weight: 600;
  line-height: ${dimensions.fontSize * 2.5}px;
  width: 100%;
`;

export const Subtitle = styled.p`
  font-size: ${dimensions.fontSize * 1.25}px;
  font-weight: 500;
  line-height: ${dimensions.fontSize * 1.5}px;
`;
