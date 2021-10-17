import styled from "styled-components";
import { colors } from "../../styles";

export const Container = styled.div`
  width: 100%;

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

export const Footer = styled.footer`
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    outline: none;
    cursor: pointer;
    background: transparent;
    border: none;
  }
`;

export const Input = styled.input`
  width: 35px;
  border-radius: 4px;
  border: 1px solid #031234;
  padding: 5px 0px 5px 12px;
  margin-left: 5px;
`;
