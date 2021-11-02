import styled from "styled-components";
import { colors } from "../../styles";

export interface ButtonProps {
  isOutlined?: boolean;
  color?: string;
  width?: string;
  margin?: string;
}
export const Button = styled.button<ButtonProps>`
  position: relative;
  height: 50px;
  border-radius: 8px;
  font-weight: 800;
  background-color: ${({ isOutlined, color }) =>
    isOutlined ? colors.white : color};
  border: ${({ isOutlined, color }) => isOutlined && `1px solid ${color}`};
  color: ${({ isOutlined, color }) => (isOutlined ? color : colors.white)};
  color: ${colors.white};
  padding: 0 20px;
  width: ${({ width }) => width || "170px"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }) => margin || "0px"};

  cursor: pointer;
  border: 0;
  transition: 0.2s filter;

  font-size: 1rem;
  text-transform: uppercase;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
