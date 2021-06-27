import styled from "styled-components";
import { colors } from "../../styles/variables";

export interface ButtonProps {
  isOutlined?: boolean;
}
export const Button = styled.button<ButtonProps>`
  height: 50px;
  border-radius: 8px;
  font-weight: 800;
  background-color: ${({ isOutlined }) =>
    isOutlined ? "#fff" : colors.mediumBlue};
  border: ${({ isOutlined }) => isOutlined && `1px solid ${colors.mediumBlue}`};
  color: ${({ isOutlined }) => (isOutlined ? `${colors.mediumBlue}` : "#fff")};
  color: #fff;
  padding: 0 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;

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
