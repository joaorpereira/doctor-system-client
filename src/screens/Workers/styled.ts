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

export const WorkersSection = styled.section`
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
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    width: 245px;
  }

  h4 {
    line-height: 30px;
    font-size: 1.25rem;
    letter-spacing: 0.04rem;
  }

  p {
    line-height: 21px;
    letter-spacing: 0.04rem;
  }

  > img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: rgba(6, 24, 44, 0.1) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.2) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }
`;

export const Section = styled.section<SectionProps>`
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "10px"};
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
