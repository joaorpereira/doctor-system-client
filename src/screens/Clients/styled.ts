import styled from "styled-components";
import { colors } from "../../styles/variables";

export const ClientSection = styled.section`
  display: flex;
  flex-direction: column;

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
  justify-content: flex-start;
  width: 50px;

  span {
    padding-right: 15px;
    cursor: pointer;
    color: ${colors.text};
    transition: color 0.1s ease-out;
    :hover {
      color: ${colors.primary};
    }
  }
`;
