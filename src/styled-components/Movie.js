import { colors, device, dimensions } from "../constants";

import styled from "styled-components";

export const MovieContainer = styled.div`
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
  flex: 0 0 ${(props) => (props.isNominations ? 35 : 90)}%;
  flex-direction: ${(props) => (props.isNominations ? "column" : "row")};
  justify-content: space-between;
  margin: ${dimensions.spacing * 4}px;
  overflow-y: hidden;
  padding: ${dimensions.spacing}px ${dimensions.spacing * 4}px;

  @media ${device.mobileS} {
    flex: 0 0 90%;
    padding: ${dimensions.spacing * 4}px;
  }

  @media ${device.tablet} {
    flex: 0 0 ${(props) => (props.isNominations ? 25 : 90)}%;
    margin: ${dimensions.spacing * 4}px;
    padding: ${dimensions.spacing * 4}px;
  }

  @media ${device.laptop} {
    flex: 0 0 ${(props) => (props.isNominations ? 30 : 50)}%;
  }

  @media ${device.laptopL} {
    flex: 0 0 ${(props) => (props.isNominations ? 14 : 40)}%;
    padding: ${dimensions.spacing * 3}px ${dimensions.spacing * 6}px;
  }

  @media ${device.desktop} {
    flex: 0 0 ${(props) => (props.isNominations ? 13 : 40)}%;
  }
`;

export const MovieDetails = styled.div`
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

export const MoviesContainer = styled.div`
  display: flex;
  flex-direction: ${window.screen.width > 749 ? "row" : "column"};
  flex-wrap: wrap;
  max-width: 1920px;
  justify-content: center;
  width: 100%;

  // @media ${device.tablet} {
  //   max-width: ${device.tablet};
  // }
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
  //default height 450, width 300
  height: ${(props) => (props.nominated ? "78px" : "135px")};
  width: ${(props) => (props.nominated ? "51px" : "105px")};
  border-radius: ${dimensions.fontSize * 0.5}px;

  @media ${device.tablet} {
    height: ${(props) => (props.nominated ? "90px" : "180px")};
    width: ${(props) => (props.nominated ? "60px" : "120px")};
  }

  @media${device.laptop} {
    height: ${(props) => (props.nominated ? "150px" : "300px")};
    width: ${(props) => (props.nominated ? "100px" : "200px")};
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
