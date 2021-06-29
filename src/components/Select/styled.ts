import { SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../styles/variables";

interface Select extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: string;
}

export const Select = styled.select<Select>`
  border: 1px solid ${colors.primary};
  outline: none;
  padding: 8px 10px;
  border-radius: 8px;
  width: ${({ width }) => (width ? width : "195px")};
  transition: border 0.15s ease-out;
  height: 35px;
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
