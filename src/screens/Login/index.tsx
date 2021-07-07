/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";

import * as S from "./styled";
import { colors } from "../../styles/variables";

import { Menu } from "../../components/Menu";

import DoctorAndPatients from "../../assets/Doctor-And-Patients-2.svg";
import Logo from "../../assets/logo.png";

const Login = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("");

  const handleChangePage = useCallback((value: string) => {
    setMenuOpen(false);
    setPage(value);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, []);

  const handleShowHamburgerMenu = useCallback(() => {
    setPage("");
    setMenuOpen(true);
  }, []);

  return (
    <S.LoginSection>
      <Menu
        page={page}
        handleOpenMenu={handleOpenMenu}
        handleShowHamburgerMenu={handleShowHamburgerMenu}
        handleChangePage={handleChangePage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <S.FlexSection direction="column">
        <S.Wrapper>
          <S.Image height="200px" src={Logo} alt={Logo} />
          <form>
            <S.Box>
              <S.Label htmlFor="email">Email:</S.Label>
              <S.Input name="email" type="password" />
            </S.Box>
            <S.Box>
              <S.Label htmlFor="password">Senha:</S.Label>
              <S.Input name="password" type="password" />
              <S.SpanLink to="/recuperar-senha">
                Esqueceu sua senha, <u>clique aqui</u>
              </S.SpanLink>
            </S.Box>
            <S.LoginBtn type="submit">Login</S.LoginBtn>
          </form>
          <S.SpanLink
            to="/cadastro"
            align="center"
            marginTop="10px"
            fontSize="1rem"
          >
            Não possui cadastro? <u>Cadastre-se aqui</u>
          </S.SpanLink>
        </S.Wrapper>
      </S.FlexSection>
      <S.FlexSection color={`${colors.primary}`}>
        <S.Image src={DoctorAndPatients} alt={DoctorAndPatients} />
      </S.FlexSection>
    </S.LoginSection>
  );
};

export default Login;
