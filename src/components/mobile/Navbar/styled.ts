import styled from "styled-components";
import { ReactComponent as Icon } from "../../../assets/home.svg";
import { ReactComponent as Icon2 } from "../../../assets/calendar.svg";
import { ReactComponent as Icon3 } from "../../../assets/users.svg";
import { colors } from "../../../styles";

type Props = {
  isSelected: boolean;
};

export const Wrapper = styled.div`
  overflow: scroll;
  width: 100%;
  height: 80px;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${colors.white};
`;

export const Div = styled.div`
  width: 8%;
  height: 80px;
  position: fixed;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 1%,
    rgba(255, 255, 255, 0.3) 2%,
    rgba(255, 255, 255, 0.4) 3%,
    rgba(255, 255, 255, 0.5) 4%,
    rgba(255, 255, 255, 0.6) 5%,
    rgba(255, 255, 255, 1) 100%
  );
  bottom: 0;
  right: 0;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0;
`;

export const ListItem = styled.li<Props>`
  min-width: 130px;
  height: 100%;
  color: ${colors.text};
  display: flex;
  text-transform: uppercase;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.text : colors.white};
`;

export const HomeIcon = styled(Icon)``;
export const UsersIcon = styled(Icon3)``;
export const CalendarIcon = styled(Icon2)``;

export const Button = styled.button<Props>`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.text : colors.white};
  color: ${({ isSelected }) => (!isSelected ? colors.text : colors.white)};
  border: none;
  outline: none;

  ${HomeIcon} {
    stroke: ${({ isSelected }) => (!isSelected ? colors.text : colors.white)};
    fill: ${({ isSelected }) => (isSelected ? colors.text : colors.white)};
    margin-bottom: 5px;
  }
  ${CalendarIcon} {
    stroke: ${({ isSelected }) => (!isSelected ? colors.text : colors.white)};
    fill: ${({ isSelected }) => (isSelected ? colors.text : colors.white)};
    margin-bottom: 5px;
  }
  ${UsersIcon} {
    stroke: ${({ isSelected }) => (!isSelected ? colors.text : colors.white)};
    fill: ${({ isSelected }) => (isSelected ? colors.text : colors.white)};
    margin-bottom: 5px;
  }
`;
