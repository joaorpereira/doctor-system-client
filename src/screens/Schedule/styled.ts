import styled from "styled-components";

export const ScheduleSection = styled.section`
  display: flex;
  flex-direction: column;
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
