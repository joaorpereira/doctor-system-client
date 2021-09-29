import styled from "styled-components";
import { colors } from "../../styles";

type ModalProps = {
  opacity?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
};

export const Modal = styled.div<ModalProps>`
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 450px;
  width: 525px;
  box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
  border-radius: 8px;
  padding: 55px 50px;
  opacity: (${({ opacity }) => (opacity ? "1" : "0")});
  transition: opacity 0.3s ease-in-out;
  z-index: 99;
`;

export const IconClose = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${colors.primary};
  position: absolute;
  font-weight: bold;
  top: 0;
  right: 0;
  margin: 45px;
  font-size: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
  width: 100%;
`;
