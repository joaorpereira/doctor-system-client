import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 10px;
`;

export const Title = styled.h1`
  background-color: #fff;
  padding: 20px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

export const Container = styled.div`
  background-color: #fff;
  flex-direction: column;
  display: flex;
  padding: 0px 20px;
  overflow-y: scroll;
  max-height: 320px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const Button = styled.button`
  background-color: #06d6a0;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 7px 18px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
`;
