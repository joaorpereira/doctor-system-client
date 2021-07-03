import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../styles/variables";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}

export const Input = styled.input<Props>`
  border: 1px solid ${colors.primary};
  outline: none;
  padding: 8px 10px;
  border-radius: 4px;
  width: ${({ width }) => (width ? width : "195px")};
  transition: border 0.15s ease-out;
  height: 40px;
  background-color: #fff;
  :focus {
    border: 2px solid ${colors.primary};
  }

  &::placeholder {
    font-size: 0.7rem;
    color: #a9a9a9;
    background-color: #fff;
  }
`;

export const Label = styled.label`
  font-size: 0.8rem;
  color: #a9a9a9;
  margin-bottom: 5px;
`;

export const Box = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width && width};
`;
