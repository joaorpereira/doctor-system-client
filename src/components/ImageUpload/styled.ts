import styled from "styled-components";
import { colors } from "../../styles/variables";

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

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
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  border: none;
  outline: none;
  margin-right: -5px;
  background-color: transparent;
`;

export const AddButton = styled.button`
  height: 120px;
  width: 120px;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${colors.blu};
`;
