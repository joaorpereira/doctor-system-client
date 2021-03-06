import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../styles";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
  height?: string;
}

export const TextArea = styled.textarea<Props>`
  border: 1px solid ${colors.primary};
  outline: none;
  padding: 8px 10px;
  border-radius: 4px;
  width: ${({ width }) => (width ? width : "195px")};
  transition: border 0.15s ease-out;
  height: ${({ height }) => (height ? height : "40px")};
  background-color: ${colors.white};
  :focus {
    border: 2px solid ${colors.primary};
  }

  &::placeholder {
    font-size: 0.7rem;
    color: ${colors.gray};
    background-color: ${colors.white};
  }
`;
