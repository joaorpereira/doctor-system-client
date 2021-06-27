import styled from "styled-components";

export interface ButtonProps {
  isOutlined?: boolean;
  color?: string;
}
export const Button = styled.button<ButtonProps>`
  height: 50px;
  border-radius: 8px;
  font-weight: 800;
  background-color: ${({ isOutlined, color }) => (isOutlined ? "#fff" : color)};
  border: ${({ isOutlined, color }) => isOutlined && `1px solid ${color}`};
  color: ${({ isOutlined, color }) => (isOutlined ? color : "#fff")};
  color: #fff;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 170px;

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
