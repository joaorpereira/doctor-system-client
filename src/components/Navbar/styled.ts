import styled from "styled-components";
import { colors } from "../../styles";

export const Nav = styled.nav`
  width: calc(100% + 70px);
  height: 80px;
  grid-area: header;
  background-color: ${colors.backgroundcolor};
  border-top-left-radius: 80px;
  transform: translateX(-70px);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 60px;
`;

export const Wrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const UserInfo = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  color: ${colors.text};
  margin-right: 15px;
  p {
    font-size: 14px;
  }
`;

export const UserImage = styled.img`
  background-color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const UserBtn = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  border: none;
  background-color: transparent;
`;
