import styled from "styled-components";

export const SectionDiv = styled.div`
  flex: ${(props) => props.flex};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 12px;
  margin: 0 1rem;
  padding: 1rem;
  box-shadow: 0px 0px 20px 5px #ffffff;
  height: 100%;
`;
