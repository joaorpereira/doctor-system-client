import React from "react";
import * as S from "./styled";

const menuList = [
  { label: "Home", link: "/" },
  { label: "Hospitais", link: "/" },
  { label: "Médicos", link: "/" },
  { label: "Meus Agendamentos", link: "/" },
];

function MobileNavbar() {
  return (
    <S.Wrapper>
      <S.List>
        {menuList.map((item) => (
          <S.ListItem key={item.label}>
            <a href={item.link}>{item.label}</a>
          </S.ListItem>
        ))}
      </S.List>
    </S.Wrapper>
  );
}

export default MobileNavbar;
