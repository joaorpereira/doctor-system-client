import styled from "styled-components";
import { colors } from "../../styles";

export const Container = styled.div`
  width: 100%;
  height: 390px;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  table {
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    background-color: #fff;
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
    td {
      font-size: 0.95rem;
    }

    th:last-child {
      padding-left: 55px;
      @media screen and (min-width: 1360px) {
        padding-left: 58px;
      }
    }
    th:nth-child(6) {
      padding-left: 29px;
      @media screen and (min-width: 1360px) {
        padding-left: 26px;
      }
    }
  }

  @media screen and (min-width: 1360px) {
    height: 650px;
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
  height: 50px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 900;
  text-align: left;
  position: sticky;
  top: 0;
`;
