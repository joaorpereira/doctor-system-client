import styled from "styled-components";
import { colors } from "../../styles/variables";

export const Container = styled.div`
  width: 100%;
  padding-right: 10px;
  table {
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    border-collapse: collapse;
    border-style: hidden;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      border-bottom: 1px solid ${colors.primary};
      padding: 10px 20px;
    }
  }
`;

export const Body = styled.tbody`
  width: 100%;
  background-color: #fff;
`;

export const Head = styled.thead`
  width: 100%;
  border: 1px solid ${colors.primary};
  background-color: ${colors.primary};
  text-align: left;
  height: 50px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 900;
`;
