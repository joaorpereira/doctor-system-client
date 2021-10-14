import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../services/api";

import * as S from "./styled";
import { colors } from "../../styles";

import { MdKeyboardReturn } from "react-icons/md";
import DoctorAndPatients from "../../assets/Doctor-And-Patients-2.svg";

import { OptionType } from "../../utils/types";
import { ValueType } from "react-select";

import {
  useAppDispatch,
  useAppSelector,
  useHandleCepMask,
  useHandleDateMask,
  useHandlePhoneMask,
  useHandleCpfOrCnpjMask,
  useSignupClient,
  useSignupWorker,
  useSignupCompany,
} from "../../hooks";

import { SignupClient } from "./SignupClient";
import { SignupCompany } from "./SignupCompany";
import { SignupWorker } from "./SignupWorker";

import { RootState } from "../../store";
import { getFilteredServices } from "../../store/ducks/servicesSlice";
import { getFilteredCompanies } from "../../store/ducks/companiesSlice";
import getCoordinates from "../../utils/helpers/getCoordinates";

const profiles = ["client", "worker", "company"];

type GeoLocation = {
  type: string;
  coordinates: number[];
};

const SignUp = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [cpfValue, setCpfValue] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cpfOrCnpjBankCode, setCpfOrCnpjBankCode] = useState("");
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
  const [selectedServices, setSelectedServices] = useState<
    ValueType<OptionType, true>
  >([]);
  const [coordinates, setCoordinates] = useState<GeoLocation>({
    type: "Point",
    coordinates: [0, 0],
  });

  const { loading, success, token } = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { companiesOptions }: any = useAppSelector(
    ({ companiesReducers }: RootState) => companiesReducers
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { page }: any = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  const { servicesOptions } = useAppSelector(
    ({ servicesReducers }: RootState) => servicesReducers
  );

  useEffect(() => {
    dispatch(getFilteredCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (companyValue !== "")
      dispatch(getFilteredServices({ id: companyValue }));
  }, [dispatch, companyValue]);

  const handleReturnPage = () => {
    if (bankInfoPage) setBankInfoPage(false);
    else history.push("/login");
  };

  useEffect(() => {
    if (cityValue && stateValue && streetValue) {
      getCoordinates({
        city: cityValue,
        state: stateValue,
        street: streetValue,
        setCoordinates,
      });
    }
  }, [streetValue, cityValue, stateValue]);

  useEffect(() => {
    if (success) history.push("/");
  }, [success, history]);

  useEffect(() => {
    if (token) history.push("/");
  }, [token, history]);

  useEffect(() => {
    if (!profiles.includes(page)) history.push("/login");
  }, [history, page]);

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

  const handlePicture = useCallback((e) => setPictureValue(e), []);

  const handleBackgroundImage = useCallback(
    (e) => setBackgroundImageValue(e),
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

  const handleServicesChange = useCallback(
    (option: ValueType<OptionType, true>) => {
      setSelectedServices(option);
    },
    []
  );

  // custom hooks - normalize input entry
  const [handleCpfOrCnpjMask] = useHandleCpfOrCnpjMask({ setCpfValue });
  const [handlePhoneMask] = useHandlePhoneMask({ setPhoneValue });
  const [handleCepMask] = useHandleCepMask({ setCepValue });
  const [handleDateMask] = useHandleDateMask({ setDateValue });

  const [onSubmitWorker] = useSignupWorker({
    genderValue,
    cpfValue,
    phoneValue,
    dateValue,
    companyValue,
    pictureValue,
    accountTypeValue,
    bankCodeValue,
    selectedServices,
    cpfOrCnpjBankCode,
  });

  const [onSubmitCompany] = useSignupCompany({
    cpfValue,
    cepValue,
    phoneValue,
    stateValue,
    countryValue,
    streetValue,
    cityValue,
    pictureValue,
    backgroundImageValue,
    accountTypeValue,
    bankCodeValue,
    coordinates,
  });

  const [onSubmitClient] = useSignupClient({
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

  return (
    <S.LoginSection>
      <S.BtnReturn onClick={handleReturnPage}>
        <MdKeyboardReturn style={{ marginRight: "5px" }} size={25} />
      </S.BtnReturn>
      <S.FlexSection direction="column">
        {page === "client" && (
          <SignupClient
            onSubmit={onSubmitClient}
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
            loading={loading}
          />
        )}
        {page === "company" && (
          <SignupCompany
            onSubmit={onSubmitCompany}
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
            loading={loading}
          />
        )}
        {page === "worker" && (
          <SignupWorker
            onSubmit={onSubmitWorker}
            handlePhoneMask={handlePhoneMask}
            handleCpfOrCnpjMask={handleCpfOrCnpjMask}
            handlePicture={handlePicture}
            handleAccountType={handleAccountType}
            handleBankCode={handleBankCode}
            handleCompanyChange={handleCompanyChange}
            handleDateMask={handleDateMask}
            handleGenderChange={handleGenderChange}
            handleServicesChange={handleServicesChange}
            cpfValue={cpfValue}
            bankInfoPage={bankInfoPage}
            servicesOptions={servicesOptions}
            companiesOptions={companiesOptions}
            setBankInfoPage={setBankInfoPage}
            loading={loading}
          />
        )}
      </S.FlexSection>
      <S.FlexSection color={`${colors.primary}`}>
        <S.Image src={DoctorAndPatients} alt={DoctorAndPatients} />
      </S.FlexSection>
    </S.LoginSection>
  );
};

export default SignUp;
