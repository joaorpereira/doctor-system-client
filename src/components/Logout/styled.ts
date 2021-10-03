import styled from "styled-components";
import { colors } from "../../styles";

type WrapperProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
  showModal: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  margin: 65px 40px 0px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
  z-index: 1;
  opacity: ${({ showModal }) => (showModal ? 1 : 0)};

  transition: opacity 200ms ease-in-out;

  ul {
    padding: 0;
    margin: 0;
  }
`;

export const Link = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: ${colors.primary};
    color: #fff;
  }
`;

export const Btn = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  color: ${colors.text};
  font-weight: 600;
  width: 100%;
  text-align: start;
  padding: 8px 20px;

  ${Link}:hover & {
    color: #fff;
  }
`;
