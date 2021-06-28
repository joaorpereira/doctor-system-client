import styled from "styled-components";
import { colors } from "../../styles/variables";
import { MdRemoveRedEye } from "react-icons/md";

type SectionProps = {
  wrap?: boolean;
  marginBottom?: string;
};

export const ClientsSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  p {
    color: ${colors.text};
  }
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
  padding-right: 10px;
  margin-bottom: 30px;
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
    height: 120px;
    border-radius: 50%;
    box-shadow: rgba(6, 24, 44, 0.1) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.2) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }
`;

export const Section = styled.section<SectionProps>`
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "20px"};
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: ${({ wrap }) => wrap && "wrap"};
`;
