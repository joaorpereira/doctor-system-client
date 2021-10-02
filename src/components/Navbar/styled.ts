import styled from "styled-components";
import { colors } from "../../styles";

export const Nav = styled.nav`
  width: calc(100% + 100px);
  height: 80px;
  grid-area: header;
  background-color: ${colors.backgroundcolor};
  border-top-left-radius: 80px;
  transform: translateX(-110px);

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
  margin-right: 10px;
  p {
    font-size: 0.8rem;
  }
`;

export const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 5px;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
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
