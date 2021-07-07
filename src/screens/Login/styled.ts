import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/variables";

type FlexProps = {
  direction?: string;
  height?: string;
};

type SpanLinkProps = {
  align?: string;
  marginTop?: string;
  fontSize?: string;
};

export const LoginSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexSection = styled.div<FlexProps>`
  display: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ color }) =>
    color ? color : `${colors.backgroundcolor}`};

  flex-direction: ${({ direction }) => (direction ? direction : "row")};
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  color: ${colors.text};
  margin-bottom: 5px;
  font-weight: 900;
`;

export const Input = styled.input`
  border: 1px solid ${colors.text};
  outline: none;
  padding: 10px;
  border-radius: 4px;
  width: ${({ width }) => (width ? width : "195px")};
  transition: border 0.15s ease-out;
  height: 46px;
  width: 375px;
  background-color: #fff;
  :focus {
    border: 2px solid ${colors.text};
  }

  &::placeholder {
    font-size: 0.7rem;
    color: #a9a9a9;
    background-color: #fff;
  }
`;

export const Image = styled.img<FlexProps>`
  height: ${({ height }) => (height ? height : "75%")};
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  background-color: ${colors.text};
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  height: 58px;
  width: 375px;
  border: none;
  border-radius: 4px;

  margin-top: 30px;

  transition: 0.2s filter;

  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;

  transition: 0.2s filter;

  &:not(:disabled):hover {
    filter: brightness(2);
  }
`;

export const SpanLink = styled(Link)<SpanLinkProps>`
  text-align: ${({ align }) => (align ? align : "right")};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "10px")};
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
`;
