import styled from "styled-components";
import { colors } from "../../styles";
import { MdRemoveRedEye } from "react-icons/md";

type CardProps = {
  showProfile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
};

type FontProps = {
  fontSize?: string;
  textAlign?: string;
  margin?: string;
};

export const Card = styled.div<CardProps>`
  background-color: #fff;
  position: absolute;
  top: 0;
  right: -80px;
  height: calc(100vh - 100px);
  width: 500px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-top-left-radius: 8px;
  padding: 55px 50px;
  transform: translateX(${({ showProfile }) => (showProfile ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;

  @media only screen and (max-width: 1360px) {
    width: 575px;
    height: calc(100vh + 20px);
    top: -100px;
  }
`;

export const CardTitle = styled.h3<FontProps>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.2rem")};
  color: ${colors.text};
  text-transform: uppercase;
  letter-spacing: 1.1px;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  margin: ${({ margin }) => margin && margin};
`;

export const StyledMdRemoveRedEye = styled(MdRemoveRedEye)`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 29px;
  cursor: pointer;
  margin-right: 8px;
  color: #a9a9a9;

  transition: color 0.3s ease-out;

  :hover {
    color: ${colors.primary};
  }
`;
