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

  > img {
    width: 85px;
    height: 85px;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-left: -100px;
  }
`;

export const List = styled.ul`
  width: 100%;
  margin: 25px 0px 0px;
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
  font-size: 1.2rem;
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
