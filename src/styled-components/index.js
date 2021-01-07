import { colors, device, dimensions, screenSize } from "../constants";

import styled from "styled-components";

export const AppMain = styled.div`
  box-sizing: border-box;
  color: ${colors.fontColor};
  display: flex;
  flex: 2;
  font-family: Roboto Mono;
  height: 100%;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  // max-width: ${screenSize.mobileS};
  width: 100%;

  // @media ${device.mobileM} {
  //   max-width: ${screenSize.mobileM};
  // }

  // @media ${device.mobileL} {
  //   max-width: ${screenSize.mobileL};
  // }

  // @media ${device.tablet} {
  //   max-width: ${screenSize.tablet};

  // @media ${device.laptop} {
  //   max-width: ${screenSize.laptop};
  // }

  // @media ${device.laptopL} {
  //   max-width: 1400px;
  // }
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

export const MovieContainerDiv = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.isNominations ? colors.secondaryColor : "none"};
  border: ${(props) =>
    props.isInNominations ? `2px solid ${colors.lightColor}` : "none"};
  border-radius: ${dimensions.fontSize * 0.75}px;
  box-sizing: border-box;
  box-shadow: ${(props) =>
    props.isNominations && props.isInNominations
      ? `0px 0px 10px 5px ${colors.secondaryColor}`
      : props.isInNominations
      ? `0px 0px 10px 5px ${colors.lightColor}`
      : "none"};
  display: flex;
  flex: 0 0 ${(props) => (props.isNominations ? 17 : 45)}%;
  flex-direction: ${(props) => (props.isNominations ? "column" : "row")};
  justify-content: space-between;
  margin: 0 ${dimensions.spacing * 20}px;
  overflow-y: hidden;
  padding: ${dimensions.spacing}px ${dimensions.spacing * 4}px;

  @media ${device.tablet} {
    flex: 0 0 ${(props) => (props.isNominations ? 17 : 100)}%;
    margin: ${dimensions.spacing * 6}px;
    padding: ${dimensions.spacing * 2}px ${dimensions.spacing * 4}px;
  }

  @media ${device.laptop} {
    flex: 0 0 ${(props) => (props.isNominations ? 17 : 60)}%;
    padding: ${dimensions.spacing * 3}px ${dimensions.spacing * 6}px;
    overflow-x: hidden;
  }

  @media ${device.laptopL} {
    flex: 0 0 ${(props) => (props.isNominations ? 15 : 45)}%;
    padding: ${dimensions.spacing * 3}px ${dimensions.spacing * 6}px;
    overflow-x: hidden;
  }
`;

export const MovieDetailsDiv = styled.div`
  align-items: space-between;
  display: flex;
  flex-direction: ${(props) => (props.isNominations ? "row" : "column")};
  justify-content: space-between;
  padding: 0 2.5%;
`;

export const MoviePlot = styled.p`
  font-size: ${dimensions.fontSize * 0.9}px;
  text-align: justify;
`;

export const MoviePosterDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: ${dimensions.spacing * 6}px;
`;

export const MovieTitle = styled.h3`
  font-size: ${dimensions.fontSize * 0.75}px;

  @media ${device.laptop} {
    font-size: ${(props) =>
      props.isNominations ? dimensions.fontSize : dimensions.fontSize * 1.25}px;
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
  font-size: ${dimensions.fontSize * 0.4}px;
  font-weight: 600;
  margin: ${dimensions.spacing * 2}px 0;
  padding: ${dimensions.spacing * 2}px ${dimensions.spacing}px;
  width: 100%;

  @media ${device.laptop} {
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
  border: none;
  border-radius: ${dimensions.fontSize * 0.25}px;
  flex: 0 0 10%;
  padding: ${dimensions.spacing}px;
`;

export const PaginationButton = styled.button`
  align-items: center;
  background-color: ${colors.secondaryColor};
  border: none;
  border-radius: ${dimensions.fontSize * 0.25}px;
  color: ${colors.lighterColor};
  display: flex;
  flex: 0 0 10%;
  font-weight: 700;
  height: 100%;
  justify-content: center;
`;

export const PosterImage = styled.img`
  height: ${(props) => (props.nominated ? "75px" : "150px")};
  width: ${(props) => (props.nominated ? "51px" : "102px")};
  border-radius: ${dimensions.fontSize * 0.5}px;

  @media ${device.tablet} {
    height: ${(props) => (props.nominated ? "75px" : "112px")};
    width: ${(props) => (props.nominated ? "50px" : "75px")};
  }

  @media${device.laptop} {
    height: ${(props) => (props.nominated ? "112px" : "336px")};
    width: ${(props) => (props.nominated ? "75px" : "225px")};
  }
`;

export const SearchBarDiv = styled.div`
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
  // position: relative;

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
