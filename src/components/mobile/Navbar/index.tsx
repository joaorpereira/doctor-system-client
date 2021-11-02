import { useState } from "react";
import * as S from "./styled";

type MenuListProps = {
  label: string;
  link: string;
  icon: React.ReactElement;
};

const menuList: MenuListProps[] = [
  { label: "Home", link: "/", icon: <S.HomeIcon /> },
  { label: "Médicos", link: "/", icon: <S.UsersIcon /> },
  { label: "Agendamentos", link: "/", icon: <S.CalendarIcon /> },
];

const MobileNavbar = () => {
  const [selected, setSelected] = useState("Home");
  const handleSelectedMenu = (item: MenuListProps) => {
    setSelected(item.label);
  };
  return (
    <S.Wrapper>
      {menuList.findIndex((item) => item.label === selected) + 1 !==
        menuList.length && <S.Div />}
      <S.List>
        {menuList.map((item) => {
          const isSelected = item.label === selected;
          return (
            <S.ListItem key={item.label} isSelected={isSelected}>
              <S.Button
                onClick={() => handleSelectedMenu(item)}
                isSelected={isSelected}
              >
                {item.icon}
                {item.label}
              </S.Button>
            </S.ListItem>
          );
        })}
      </S.List>
    </S.Wrapper>
  );
};

export default MobileNavbar;
