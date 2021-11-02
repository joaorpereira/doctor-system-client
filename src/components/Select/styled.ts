import styled from "styled-components";
import { colors } from "../../styles";

interface SelectProps {
  width?: string;
}

export const Select = styled.select<SelectProps>`
  border: 1px solid ${colors.primary};
  outline: none;
  height: 40px;
  border-radius: 4px;
  width: ${({ width }) => (width ? width : "100%")};
  color: ${colors.text};
  transition: border 0.15s ease-out;
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
