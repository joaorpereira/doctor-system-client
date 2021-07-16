import { colors } from "../../styles";
import styled from "styled-components";

export const CloseIcon = styled.button`
  height: 30px;
  width: 35px;
  background-color: ${colors.primary};
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 75%;
  margin-left: -1px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
`;
