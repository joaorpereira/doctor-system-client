import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: -2px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
`;

export const IconButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 5px;
  }

  p {
    font-size: 11px;
  }
`;

export const Button = styled.button`
  background-color: #06d6a0;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const ScheduleLaterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    font-size: 11px;
  }
`;
