import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as S from "./styled";
import { colors } from "../../styles/variables";
import DoctorAndPatients from "../../assets/Doctor-And-Patients-2.svg";
import Logo from "../../assets/logo.png";

import { MdKeyboardReturn } from "react-icons/md";
import { Spinner } from "../../components";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { requestLogin, setSignupPage } from "../../store/ducks/authSlice";
import { useHistory } from "react-router-dom";

const profiles = {
  client: "client",
  worker: "worker",
  company: "company",
};

type FormProps = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState("");
  const history = useHistory();

  const { loading, token } = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  useEffect(() => {
    if (token) history.push("/");
  }, [token, history]);

  const handleChangePage = (value: string) => setPage(value);
  const handleSignupPage = () => {
    dispatch(setSignupPage(page));
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({});

  const onSubmit = (data: FormProps) => {
    switch (page) {
      case profiles.client:
        dispatch(requestLogin({ ...data, typeUser: profiles.client }));
        break;
      case profiles.worker:
        dispatch(requestLogin({ ...data, typeUser: profiles.worker }));
        break;
      case profiles.company:
        dispatch(requestLogin({ ...data, typeUser: profiles.company }));
        break;
    }
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
              <S.Button onClick={() => handleChangePage(profiles.client)}>
                Cliente
              </S.Button>
              <S.Button onClick={() => handleChangePage(profiles.worker)}>
                Colaborador
              </S.Button>
              <S.Button onClick={() => handleChangePage(profiles.company)}>
                Empresa
              </S.Button>
            </S.BtnContainer>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <S.Box>
                  <S.Label htmlFor="email">Email:</S.Label>
                  <S.Input
                    type="text"
                    autoComplete="off"
                    {...register("email")}
                  />
                </S.Box>
                <S.Box>
                  <S.Label htmlFor="password">Senha:</S.Label>
                  <S.Input
                    autoComplete="off"
                    type="password"
                    {...register("password")}
                  />
                  <S.SpanLink to="/recuperar-senha">
                    Esqueceu sua senha, <u>clique aqui</u>
                  </S.SpanLink>
                </S.Box>
                <S.Button disabled={isSubmitting} type="submit">
                  {!loading ? (
                    <p>Login</p>
                  ) : (
                    <Spinner
                      size="35px"
                      style={{ position: "absolute", top: 35, left: 195 }}
                    />
                  )}
                </S.Button>
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
