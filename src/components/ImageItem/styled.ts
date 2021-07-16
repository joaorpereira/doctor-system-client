import styled from "styled-components";
import { colors } from "../../styles";

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 120px;
  width: 120px;
  border-radius: 4px;
  outline: none;
`;

export const Image = styled.img`
  object-fit: cover;
  height: 120px;
  width: 120px;
  border-radius: 4px;
`;

export const RemoveButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  border: none;
  outline: none;
  margin-right: -5px;
  background-color: transparent;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddButton = styled.div`
  height: 120px;
  width: 120px;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${colors.blu};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
