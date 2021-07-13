import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import * as S from "./styled";
import { colors } from "../../styles/variables";

import { MdKeyboardReturn } from "react-icons/md";

import DoctorAndPatients from "../../assets/Doctor-And-Patients-2.svg";
import Logo from "../../assets/logo.png";
import { OptionType } from "../../utils/globalTypes";
import useHandleCpfOrCnpjMask from "../../hooks/useHandleCpfOrCnpjMask";
import useHandlePhoneMask from "../../hooks/useHandlePhoneMask";
import useHandleCepMask from "../../hooks/useHandleCepMask";
import useHandleDateMask from "../../hooks/useHandleDateMask";
import useOnSubmit from "./hooks/useOnSubmit";

import axios from "../../services/api";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store";
import { getFilteredCompanies } from "../../store/ducks/companiesSlice";
import SignupClient from "./SignupClient";
import SignupCompany from "./SignupCompany";
import SignupWorker from "./SignupWorker";

const SignUp = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

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
  const [companyValue, setCompanyValue] = useState("");
  const [bankInfoPage, setBankInfoPage] = useState(false);
  const [pictureValue, setPictureValue] = useState("");
  const [backgroundImageValue, setBackgroundImageValue] = useState("");
  const [accountTypeValue, setAccountTypeValue] = useState("");
  const [bankCodeValue, setBankCodeValue] = useState("");

  const { companiesOptions }: any = useAppSelector(
    ({ companiesReducers }: RootState) => companiesReducers
  );

  const { page }: any = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  useEffect(() => {
    dispatch(getFilteredCompanies());
  }, [dispatch]);

  const handleGenderChange = useCallback(
    (e: OptionType) => setGenderValue(e.value),
    []
  );
  const handleStateChange = useCallback(
    (e: OptionType) => setStateValue(e.value),
    []
  );
  const handleCountryChange = useCallback(
    (e: OptionType) => setCountryValue(e.value),
    []
  );
  const handleCompanyChange = useCallback(
    (e: OptionType) => setCompanyValue(e.value),
    []
  );
  const handlePicture = useCallback((e: any) => setPictureValue(e), []);
  const handleBackgroundImage = useCallback(
    (e: any) => setBackgroundImageValue(e),
    []
  );
  const handleAccountType = useCallback(
    (e: OptionType) => setAccountTypeValue(e.value),
    []
  );
  const handleBankCode = useCallback(
    (e: OptionType) => setBankCodeValue(e.value),
    []
  );

  const resetValues = () => {
    setGenderValue("");
    setCpfValue("");
    setCepValue("");
    setPhoneValue("");
    setDateValue("");
    setStateValue("");
    setCityValue("");
    setStreetValue("");
    setCountryValue("");
    setCompanyValue("");
    setPictureValue("");
    setBackgroundImageValue("");
    setAccountTypeValue("");
    setBankCodeValue("");
  };

  // custom hooks - normalize input entry
  const [handleCpfOrCnpjMask] = useHandleCpfOrCnpjMask({ setCpfValue });
  const [handlePhoneMask] = useHandlePhoneMask({ setPhoneValue });
  const [handleCepMask] = useHandleCepMask({ setCepValue });
  const [handleDateMask] = useHandleDateMask({ setDateValue });

  // custom hooks - submit form to create or update client
  const [onSubmit] = useOnSubmit({
    type: page,
    genderValue,
    cpfValue,
    cepValue,
    phoneValue,
    dateValue,
    stateValue,
    countryValue,
    streetValue,
    cityValue,
    companyValue,
    pictureValue,
    backgroundImageValue,
    accountTypeValue,
    bankCodeValue,
    resetValues,
  });

  const handleGetAPIAdressInformation = useCallback(
    async (e: React.FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const cep = value?.replace(/[^0-9]/g, "");
      if (cep?.length !== 8) {
        return;
      }
      setFetchCep(true);
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        setStateValue(data.uf);
        setCityValue(data.localidade);
        setStreetValue(data.logradouro);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchCep(false);
      }
    },
    []
  );

  const handleReturnPage = () => {
    if (bankInfoPage) setBankInfoPage(false);
    else history.push("/login");
  };

  return (
    <S.LoginSection>
      <S.BtnReturn onClick={handleReturnPage}>
        <MdKeyboardReturn style={{ marginRight: "5px" }} size={25} />
      </S.BtnReturn>
      <S.FlexSection direction="column">
        {page === "cliente" && (
          <SignupClient
            onSubmit={onSubmit}
            handleDateMask={handleDateMask}
            handlePhoneMask={handlePhoneMask}
            handleGenderChange={handleGenderChange}
            handleCompanyChange={handleCompanyChange}
            handleCpfOrCnpjMask={handleCpfOrCnpjMask}
            handleCountryChange={handleCountryChange}
            handleCepMask={handleCepMask}
            handleGetAPIAdressInformation={handleGetAPIAdressInformation}
            companiesOptions={companiesOptions}
            handleStateChange={handleStateChange}
            fetchCep={fetchCep}
            streetValue={streetValue}
            stateValue={stateValue}
            cityValue={cityValue}
            cpfValue={cpfValue}
          />
        )}
        {page === "empresa" && (
          <SignupCompany
            onSubmit={onSubmit}
            handlePhoneMask={handlePhoneMask}
            handleCpfOrCnpjMask={handleCpfOrCnpjMask}
            handleCountryChange={handleCountryChange}
            handleCepMask={handleCepMask}
            handleGetAPIAdressInformation={handleGetAPIAdressInformation}
            handleStateChange={handleStateChange}
            handlePicture={handlePicture}
            handleBackgroundImage={handleBackgroundImage}
            handleAccountType={handleAccountType}
            handleBankCode={handleBankCode}
            fetchCep={fetchCep}
            streetValue={streetValue}
            stateValue={stateValue}
            cityValue={cityValue}
            cpfValue={cpfValue}
            bankInfoPage={bankInfoPage}
            setBankInfoPage={setBankInfoPage}
          />
        )}
        {/* {page === "colaborador" && (
          <SignupWorker
            onSubmit={onSubmit}
            handleDateMask={handleDateMask}
            handlePhoneMask={handlePhoneMask}
            handleGenderChange={handleGenderChange}
            handleCompanyChange={handleCompanyChange}
            handleCpfOrCnpjMask={handleCpfOrCnpjMask}
            handleCountryChange={handleCountryChange}
            handleCepMask={handleCepMask}
            handleGetAPIAdressInformation={handleGetAPIAdressInformation}
            companiesOptions={companiesOptions}
            handleStateChange={handleStateChange}
            fetchCep={fetchCep}
            streetValue={streetValue}
            stateValue={stateValue}
            cityValue={cityValue}
            cpfValue={cpfValue}
            bankInfoPage={bankInfoPage}
            setBankInfoPage={setBankInfoPage}
          />
        )} */}
      </S.FlexSection>
      <S.FlexSection color={`${colors.primary}`}>
        <S.Image src={DoctorAndPatients} alt={DoctorAndPatients} />
      </S.FlexSection>
    </S.LoginSection>
  );
};

export default SignUp;
