import styled from "styled-components";
import { colors } from "../../styles";

type Props = {
  width?: string;
  flex?: number;
  flexBasis?: string;
};

type LabelProps = {
  secondary?: boolean;
};

export const Input = styled.input<Props>`
  border: 1px solid ${colors.primary};
  outline: none;
  padding: 8px 10px;
  border-radius: 4px;
  width: ${({ width }) => (width ? width : "100%")};
  transition: border 0.15s ease-out;
  height: 40px;
  background-color: #fff;
  color: ${colors.text};
  :focus {
    border: 2px solid ${colors.primary};
  }

  &::placeholder {
    font-size: 0.7rem;
    color: #a9a9a9;
    background-color: #fff;
  }
`;

export const Label = styled.label<LabelProps>`
  font-size: ${({ secondary }) => (secondary ? "1rem" : "0.8rem")};
  color: ${({ secondary }) => (secondary ? "#a9a9a9" : `${colors.text}`)};
  margin-bottom: 5px;
`;
