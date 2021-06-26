import * as S from "./styled";
import { MdExpandMore } from "react-icons/md";

export const Navbar = () => {
  return (
    <S.Nav>
      <S.Wrapper>
        <S.UserInfo>
          <h4>Barbearia do João</h4>
          <p>João Paulo</p>
        </S.UserInfo>
        <S.UserBtn>
          <S.UserImage />
          <MdExpandMore />
        </S.UserBtn>
      </S.Wrapper>
    </S.Nav>
  );
};
