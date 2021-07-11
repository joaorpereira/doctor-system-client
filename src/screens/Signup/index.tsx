import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";

import * as S from "./styled";
import { colors } from "../../styles/variables";

import { MdKeyboardReturn } from "react-icons/md";

import DoctorAndPatients from "../../assets/Doctor-And-Patients-2.svg";
import Logo from "../../assets/logo.png";
import { genderOptions, OptionType } from "../../utils/globalTypes";
import { reactSelectedStyleSigupPage } from "../../styles/global";
import useHandleCpfOrCnpjMask from "../../hooks/useHandleCpfOrCnpjMask";
import useHandlePhoneMask from "../../hooks/useHandlePhoneMask";
import useHandleCepMask from "../../hooks/useHandleCepMask";
import useHandleDateMask from "../../hooks/useHandleDateMask";
import useOnSubmit from "./hooks/useOnSubmit";
import { countryList } from "../../utils/countries";
import { states } from "../../utils/states";
import axios from "../../services/api";
import InputComponent from "../../components/Input";
import { Spinner } from "../../components/Spinner";

const SignUp = () => {
  const history = useHistory();
  const [cpfValue, setCpfValue] = useState("");
  const [cepValue, setCepValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [countryValue, setCountryValue] = useState("BR");
  const [cityValue, setCityValue] = useState("");
  const [streetValue, setStreetValue] = useState("");
  const [fetchCep, setFetchCep] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({});

  const handleGenderChange = (e: OptionType) => setGenderValue(e.value);
  const handleStateChange = (e: OptionType) => setStateValue(e.value);
  const handleCountryChange = (e: OptionType) => setCountryValue(e.value);

  // custom hooks - normalize input entry
  const [handleCpfOrCnpjMask] = useHandleCpfOrCnpjMask({ setCpfValue });
  const [handlePhoneMask] = useHandlePhoneMask({ setPhoneValue });
  const [handleCepMask] = useHandleCepMask({ setCepValue });
  const [handleDateMask] = useHandleDateMask({ setDateValue });

  // custom hooks - submit form to create or update client
  const [onSubmit] = useOnSubmit({
    genderValue,
    cpfValue,
    cepValue,
    phoneValue,
    dateValue,
    stateValue,
    countryValue,
    streetValue,
    cityValue,
    setGenderValue,
    setCpfValue,
    setCepValue,
    setPhoneValue,
    setDateValue,
    setStateValue,
    setCityValue,
    setStreetValue,
    setCountryValue,
  });

  const handleGetAPIAdressInformation = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const cep = value?.replace(/[^0-9]/g, "");
    if (cep?.length !== 8) {
      return;
    }
    setFetchCep(true);
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setStateValue(data.uf);
      setCityValue(data.localidade);
      setStreetValue(data.logradouro);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchCep(false);
    }
  };

  return (
    <S.LoginSection>
      <S.BtnReturn onClick={() => history.push("/login")}>
        <MdKeyboardReturn style={{ marginRight: "5px" }} size={25} />
        <p>Voltar</p>
      </S.BtnReturn>
      <S.FlexSection direction="column">
        <S.Image height="12%" src={Logo} alt={Logo} />
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Dados Pessoais</h1>
          <S.FormSection>
            <InputComponent width="257px" secondary name="name" label="Nome:">
              <S.Input type="text" {...register("name")} />
            </InputComponent>
            <InputComponent
              secondary
              name="birth_date"
              label="Data de Nascimento:"
            >
              <S.Input
                maxLength={10}
                placeholder="dd/MM/yyyy"
                type="text"
                {...register("birth_date")}
                onChange={(e) => handleDateMask(e)}
              />
            </InputComponent>
            <InputComponent secondary name="phone_number" label="Telefone:">
              <S.Input
                type="tel"
                maxLength={12}
                placeholder="+55 99999-9999"
                {...register("phone_number")}
                onChange={(e) => handlePhoneMask(e)}
              />
            </InputComponent>
            <InputComponent
              secondary
              name="gender"
              label="Gênero:"
              width="80px"
            >
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    styles={{
                      control: (base) => ({
                        ...base,
                        ...reactSelectedStyleSigupPage,
                        width: "100px !important",
                      }),
                    }}
                    options={genderOptions}
                    onChange={(e) => handleGenderChange(e as OptionType)}
                  />
                )}
              />
            </InputComponent>
            <InputComponent
              width="257px"
              secondary
              name="document.number"
              label="CPF/CNPJ:"
            >
              <S.Input
                type="text"
                value={cpfValue}
                {...register("document.number")}
                onChange={(e) => handleCpfOrCnpjMask(e)}
              />
            </InputComponent>
            <InputComponent width="257px" secondary name="email" label="Email:">
              <S.Input type="email" {...register("email")} />
            </InputComponent>
            <InputComponent
              width="256px"
              secondary
              name="password"
              label="Senha:"
            >
              <S.Input type="password" {...register("password")} />
            </InputComponent>
          </S.FormSection>
          <h1>Endereço</h1>
          <S.FormSection>
            <InputComponent secondary name="address.country" label="País:">
              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    styles={{
                      control: (base) => ({
                        ...base,
                        ...reactSelectedStyleSigupPage,
                        width: "177px !important",
                      }),
                    }}
                    value={countryList.filter(
                      (option: OptionType) => option.value === "BR"
                    )}
                    options={countryList}
                    onChange={(e) => handleCountryChange(e as OptionType)}
                  />
                )}
              />
            </InputComponent>
            <InputComponent
              width="200px"
              secondary
              name="address.cep"
              label="CEP:"
            >
              <S.Input
                type="text"
                maxLength={9}
                {...register("address.cep")}
                placeholder="99999-999"
                onChange={(e) => handleCepMask(e)}
                onBlur={(e) => handleGetAPIAdressInformation(e)}
              />
              {fetchCep && <Spinner loading size="30px" />}
            </InputComponent>
            <InputComponent secondary name="address.state" label="Estado:">
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    value={states.filter(
                      (option: OptionType) => option.value === stateValue
                    )}
                    styles={{
                      control: (base) => ({
                        ...base,
                        ...reactSelectedStyleSigupPage,
                        width: "177px !important",
                      }),
                    }}
                    options={states}
                    onChange={(e) => handleStateChange(e as OptionType)}
                  />
                )}
              />
            </InputComponent>
            <InputComponent
              width="201px"
              secondary
              name="address.city"
              label="Cidade:"
            >
              <S.Input
                type="text"
                defaultValue={cityValue}
                {...register("address.city")}
              />
            </InputComponent>
            <InputComponent
              width="256px"
              secondary
              name="address.street"
              label="Rua:"
            >
              <S.Input
                type="text"
                defaultValue={streetValue}
                {...register("address.street")}
              />
            </InputComponent>
            <InputComponent
              width="80px"
              secondary
              name="address.number"
              label="Número:"
            >
              <S.Input type="text" {...register("address.number")} />
            </InputComponent>
          </S.FormSection>
          <S.BtnDiv>
            <S.Button disabled={isSubmitting} type="submit">
              {!isSubmitting ? (
                <p>Enviar</p>
              ) : (
                <Spinner
                  size="35px"
                  style={{ position: "absolute", top: 35, left: 195 }}
                />
              )}
            </S.Button>
          </S.BtnDiv>
        </S.Form>
      </S.FlexSection>
      <S.FlexSection color={`${colors.primary}`}>
        <S.Image src={DoctorAndPatients} alt={DoctorAndPatients} />
      </S.FlexSection>
    </S.LoginSection>
  );
};

export default SignUp;
