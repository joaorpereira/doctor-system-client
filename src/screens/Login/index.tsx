import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import * as S from "./styled";
import { colors } from "../../styles/variables";
import DoctorAndPatients from "../../assets/Doctor-And-Patients-2.svg";
import Logo from "../../assets/logo.png";

import { MdKeyboardReturn } from "react-icons/md";
import { Spinner } from "../../components";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector, useWindowSize } from "../../hooks";
import { requestLogin, setSignupPage } from "../../store/ducks/authSlice";

const profiles = {
  client: "client",
  worker: "worker",
  company: "company",
};

const buttonsOptions = [
  { label: "Cliente", value: profiles.client },
  { label: "Colaborador", value: profiles.worker },
  { label: "Empresa", value: profiles.company },
];

type FormProps = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState("");
  const history = useHistory();
  const size = useWindowSize();

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
          <S.Logo height="200px" src={Logo} alt={Logo} />
          {page === "" ? (
            <S.BtnContainer>
              {buttonsOptions.map((item) => (
                <S.Button
                  key={item.label}
                  onClick={() => handleChangePage(item.value)}
                >
                  {item.label}
                </S.Button>
              ))}
            </S.BtnContainer>
          ) : (
            <>
              <S.Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <S.Box>
                  <S.Label htmlFor="email">Email:</S.Label>
                  <S.Input
                    autoComplete="off"
                    type="text"
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
              </S.Form>
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
      {size.width > 800 && (
        <S.FlexSection color={`${colors.primary}`}>
          <S.Image src={DoctorAndPatients} alt={DoctorAndPatients} />
        </S.FlexSection>
      )}
    </S.LoginSection>
  );
};

export default Login;
