import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../styles/variables";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: string;
}

export const TextArea = styled.textarea<Props>`
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
