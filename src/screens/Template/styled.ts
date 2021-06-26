import styled from "styled-components";
import { colors } from "../../styles/variables";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar content";
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;
`;

export const Main = styled.main`
  width: calc(100% + 70px);
  height: 100%;
  background-color: ${colors.backgroundcolor};
  grid-area: content;
  transform: translateX(-70px);
  border-bottom-left-radius: 90px;
  box-shadow: 0px 10px 29px -50px rgba(100, 100, 111, 0.8);
`;