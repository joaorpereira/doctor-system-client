import styled from "styled-components";
import { colors } from "../../../styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 4px;
  object-fit: cover;
`;

export const Content = styled.div`
  margin-left: 10px;
  max-width: 130px;

  > p {
    font-size: 12px;
  }
`;

export const Button = styled.button`
  background-color: ${colors.lightGreen};
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 7px 18px;
  text-transform: uppercase;
  color: ${colors.white};
  font-weight: 700;
`;
