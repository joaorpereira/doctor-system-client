import { useState } from "react";

import * as S from "./styled";
import { colors } from "../../styles/variables";

import { MdKeyboardReturn } from "react-icons/md";

import DoctorAndPatients from "../../assets/Doctor-And-Patients-2.svg";
import Logo from "../../assets/logo.png";
import { useAppDispatch } from "../../hooks/hooks";
import { setSignupPage } from "../../store/ducks/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState("");

  const handleChangePage = (value: string) => setPage(value);
  const handleSignupPage = () => {
    dispatch(setSignupPage(page));
  };

  return (
    <S.LoginSection>
      {page !== "" && (
        <S.BtnReturn onClick={() => handleChangePage("")}>
          <MdKeyboardReturn style={{ marginRight: "5px" }} size={25} />
        </S.BtnReturn>
      )}
      <S.FlexSection direction="column">
        <S.Wrapper>
          <S.Image height="200px" src={Logo} alt={Logo} />
          {page === "" ? (
            <S.BtnContainer>
              <S.Button onClick={() => handleChangePage("cliente")}>
                Cliente
              </S.Button>
              <S.Button onClick={() => handleChangePage("colaborador")}>
                Colaborador
              </S.Button>
              <S.Button onClick={() => handleChangePage("empresa")}>
                Empresa
              </S.Button>
            </S.BtnContainer>
          ) : (
            <>
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
                <S.Button type="submit">Login</S.Button>
              </form>
              <S.SpanLink
                to="/cadastro"
                align="center"
                margintop="10px"
                fontSize="1rem"
                onClick={handleSignupPage}
              >
                Não possui cadastro? <u>Cadastre-se aqui</u>
              </S.SpanLink>
            </>
          )}
        </S.Wrapper>
      </S.FlexSection>
      <S.FlexSection color={`${colors.primary}`}>
        <S.Image src={DoctorAndPatients} alt={DoctorAndPatients} />
      </S.FlexSection>
    </S.LoginSection>
  );
};

export default Login;
