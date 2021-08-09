import styled from "styled-components";
import { colors } from "../../styles";

type SectionProps = {
  wrap?: boolean;
  marginBottom?: string;
};

type DivProps = {
  gap?: string;
  column?: boolean;
  bottom?: string;
  top?: string;
};

export const ClientsSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  h4 {
    color: ${colors.text};
  }
`;

export const HeaderRow = styled.header`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media screen and (min-width: 1360) {
    margin-bottom: 30px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > button:first-child {
    margin-right: 10px;
  }
`;

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 120px;
  button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    color: ${colors.text};
    transition: color 0.1s ease-out;
    :hover {
      color: ${colors.primary};
    }
  }
`;

export const CardHeader = styled.header`
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Section = styled.section<SectionProps>`
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "20px"};
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: ${({ wrap }) => wrap && "wrap"};
`;

export const Div = styled.div<DivProps>`
  display: flex;
  gap: ${({ gap }) => gap && gap};
  flex-direction: ${({ column }) => column && "column"};
  margin-bottom: ${({ bottom }) => bottom && bottom};
  margin-top: ${({ top }) => top && top};
`;
