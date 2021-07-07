import { useRef, forwardRef } from "react";

import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Hamburger } from "../Hamburger";
import * as S from "./styled";

type Props = {
  page: string;
  handleOpenMenu: () => void;
  handleShowHamburgerMenu: () => void;
  handleChangePage: (value: string) => void;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Menu = forwardRef(
  ({
    page,
    handleOpenMenu,
    handleShowHamburgerMenu,
    handleChangePage,
    menuOpen,
    setMenuOpen,
  }: Props) => {
    const ref = useRef();

    useOnClickOutside({ ref, handler: () => setMenuOpen(false) });
    return (
      <>
        <S.HamburgerContainer onClick={handleOpenMenu}>
          <Hamburger />
        </S.HamburgerContainer>
        <S.LinkBtn opacity={page !== ""} onClick={handleShowHamburgerMenu}>
          {page === "cliente"
            ? "Acesso Paciente"
            : page === "colaborador"
            ? "Acesso Colaborador"
            : page === "empresa"
            ? "Acesso Empresa"
            : ""}
        </S.LinkBtn>
        <S.Menu ref={ref} opacity={menuOpen}>
          <S.Item onClick={() => handleChangePage("cliente")}>Cliente</S.Item>
          <S.Item onClick={() => handleChangePage("colaborador")}>
            Colaborador
          </S.Item>
          <S.Item isLast onClick={() => handleChangePage("empresa")}>
            Empresa
          </S.Item>
        </S.Menu>
      </>
    );
  }
);
