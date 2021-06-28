import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../styles/variables";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  readonly?: boolean;
}

export const Input = styled.input<InputProps>`
  border: 1px solid ${colors.primary};
  outline: none;
  padding: 8px 15px;
  border-radius: 8px;
  width: ${({ width }) => (width ? width : "195px")};
  transition: border 0.15s ease-out;
  height: 35px;
  :focus {
    border: 2px solid ${colors.primary};
  }
`;

export const Label = styled.label`
  font-size: 0.8rem;
  color: #a9a9a9;
  margin-bottom: 5px;
`;

export const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
