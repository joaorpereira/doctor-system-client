import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../styles";

type FlexProps = {
  direction?: string;
  height?: string;
};

type SpanLinkProps = {
  align?: string;
  margintop?: string;
  fontSize?: string;
};

type FormSectionProps = {
  align?: string;
  justify?: string;
};

type InputProps = {
  width?: string;
};

export const LoginSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    padding: 50px 50px;
  }
`;

export const FlexSection = styled.div<FlexProps>`
  @media only screen and (min-width: 350px) and (max-width: 800px) {
    :nth-child(3) {
      display: none;
    }
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;

  background-color: ${({ color }) =>
    color ? color : `${colors.backgroundcolor}`};
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  padding: 0px 80px;
`;

export const Label = styled.label`
  font-size: 1rem;
  color: ${colors.text};
  margin-bottom: 5px;
`;

export const Input = styled.input<InputProps>`
  border: 1px solid ${colors.text};
  outline: none;
  padding: 10px;
  border-radius: 4px;
  transition: border 0.15s ease-out;
  height: 46px;
  background-color: ${colors.white};
  :focus {
    border: 2px solid ${colors.text};
  }

  &::placeholder {
    font-size: 0.7rem;
    color: ${colors.gray};
    background-color: ${colors.white};
  }
`;

export const Image = styled.img<FlexProps>`
  height: ${({ height }) => (height ? height : "75%")};
  margin-bottom: 30px;
  @media only screen and (min-width: 350px) and (max-width: 800px) {
    height: 120px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  h1 {
    margin-bottom: 20px;
    font-size: 1.8rem;
  }

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    height: 100%;
    align-items: center;
    h1 {
      margin: 15px 0px;
      font-size: 1.25rem;
      text-transform: uppercase;
    }
  }
`;

export const Button = styled.button`
  position: relative;
  background-color: ${colors.text};
  color: ${colors.white};
  font-weight: 600;
  text-transform: uppercase;
  height: 58px;
  width: 375px;
  border: none;
  border-radius: 4px;

  margin-top: 30px;

  transition: 0.2s filter;
  margin: 0 auto;

  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;

  transition: 0.2s filter;

  &:not(:disabled):hover {
    filter: brightness(2);
  }
`;

export const SpanButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.text};
  color: ${colors.white};
  font-weight: 600;
  text-transform: uppercase;
  height: 58px;
  width: 375px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;

  transition: 0.2s filter;
  margin: 0 auto;

  font-size: 1.35rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;

  transition: 0.2s filter;

  &:not(:disabled):hover {
    filter: brightness(2);
  }
`;

export const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    margin: 0px;
  }
`;

export const SpanLink = styled(Link)<SpanLinkProps>`
  text-align: ${({ align }) => (align ? align : "right")};
  margin-top: ${({ margintop }) => (margintop ? margintop : "10px")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "0.85rem")};
  font-weight: bold;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
`;

export const BtnReturn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${colors.text};
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  transition: 0.2s filter;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: 0.2s filter;

  :hover {
    filter: brightness(2);
  }

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    p {
      display: none;
    }
  }
`;

export const FormSection = styled.div<FormSectionProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: ${({ align }) => (align ? align : "start")};
  justify-content: ${({ justify }) => (justify ? justify : "start")};
  margin-bottom: 40px;
`;

export const InputImage = styled.input`
  height: 125px;
  width: 125px;
  border: 1px solid black;
  border-radius: 50%;
`;

export const InputImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  gap: 50px;
`;
