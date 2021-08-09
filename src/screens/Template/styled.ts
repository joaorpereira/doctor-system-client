import styled from "styled-components";
import { colors } from "../../styles";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar content";
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    height: 100%;
  }
`;

export const Private = styled.main`
  width: calc(100% + 100px);
  height: calc(100vh - 80px);
  background-color: ${colors.backgroundcolor};
  grid-area: content;
  transform: translateX(-110px);
  border-bottom-left-radius: 80px;
  box-shadow: 0px 10px 29px -50px rgba(100, 100, 111, 0.8);
  padding: 0px 60px 20px;

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    height: 100%;
  }

  @media only screen and (min-width: 1360px) {
    padding: 20px 60px;
  }
`;

export const Public = styled.main`
  width: 100%;
  height: calc(100vh - 80px);
  background-color: ${colors.backgroundcolor};

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    height: 100%;
  }
`;
