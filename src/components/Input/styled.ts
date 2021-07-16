import styled from "styled-components";
import { colors } from "../../styles";

type Props = {
  width?: string;
};

type LabelProps = {
  secondary?: boolean;
};

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

export const Label = styled.label<LabelProps>`
  font-size: ${({ secondary }) => (secondary ? "1rem" : "0.8rem")};
  color: ${({ secondary }) => (secondary ? `${colors.text}` : "#a9a9a9")};
  margin-bottom: 5px;
`;

export const Box = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width && width};

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    width: 100%;
  }
`;
