import styled from "styled-components";
import { colors } from "../../styles/variables";

type ItemProps = {
  isLast?: boolean;
};

type FadeProps = {
  opacity?: boolean;
  ref?: any;
};

export const HamburgerContainer = styled.div<FadeProps>`
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px 30px;
  cursor: pointer;
`;

export const LinkBtn = styled.button<FadeProps>`
  position: absolute;
  top: 0;
  right: 50%;
  margin-top: 22px;
  margin-right: 20px;
  padding: 15px;

  background-color: ${colors.primary};
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  min-width: 150px;
  max-width: 250px;
  border: none;
  border-radius: 4px;

  transition: 0.2s filter;

  font-size: 1rem;
  text-transform: uppercase;

  &:not(:disabled):hover {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  opacity: ${({ opacity }) => (opacity ? 1 : 0)};
  transition: opacity 225ms linear;
`;

export const Menu = styled.ul<FadeProps>`
  position: absolute;
  top: 0;
  left: 0;
  margin: 60px 30px;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: auto;
  width: 180px;
  border-radius: 4px;
  background-color: #fff;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;

  opacity: ${({ opacity }) => (opacity ? 1 : 0)};
  transition: opacity 225ms linear;
`;

export const Item = styled.li<ItemProps>`
  padding: 14px 20px;
  border-bottom: ${({ isLast }) => (!isLast ? "1px solid lightgray" : "none")};
  font-weight: bold;
  color: ${colors.text};
  text-transform: uppercase;

  :hover {
    background-color: ${colors.text};
    color: #fff;
    border-bottom: 1px solid ${colors.text};
  }
`;
