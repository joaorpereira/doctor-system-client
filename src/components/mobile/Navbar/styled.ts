import styled from "styled-components";
import { colors } from "../../../styles";

export const Wrapper = styled.div`
  overflow: scroll;
  width: 100%;
  height: 80px;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  :before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 65%,
      rgba(255, 255, 255, 0.9) 90%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0;
`;

export const ListItem = styled.li`
  min-width: 130px;
  height: 100%;
  color: ${colors.text};
  display: flex;
  font-weight: bold;
  text-transform: uppercase;

  a {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;
