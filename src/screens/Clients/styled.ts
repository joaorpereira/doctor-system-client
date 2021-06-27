import styled from "styled-components";

export const ClientSection = styled.section`
  display: flex;
  flex-direction: column;
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
