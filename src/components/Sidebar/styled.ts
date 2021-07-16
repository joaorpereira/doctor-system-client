import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles";

export const Aside = styled.aside`
  width: 300px;
  height: 100%;
  background-color: ${colors.primary};
  grid-area: sidebar;

  display: flex;
  flex-direction: column;

  padding: 40px 0px;
  > div {
    width: 180px;
    height: 60px;
    border-radius: 16px;
    background-color: #fff;
    margin-left: 25px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const List = styled.ul`
  width: 100%;
  margin: 40px 0px;
  padding: 0;
`;

export const ListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  font-weight: 700;
  line-height: 3.75rem;
  font-size: 1.3rem;
  padding-left: 25px;
  transition: background 0.3s ease-out;

  :hover {
    background-color: #00000020;
  }
`;

export const StyledLink = styled(Link)`
  margin-left: 10px;
  width: 175px;
`;
