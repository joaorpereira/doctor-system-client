import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import * as S from "./styled";

import { Spinner, InputComponent } from "../../../components";
import { genderOptions, OptionType } from "../../../utils/globalTypes";
import { reactSelectedStyleSigupPage } from "../../../styles/global";
import { countryList } from "../../../utils/countries";
import { states } from "../../../utils/states";

type ClientPageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  handleDateMask: (
    e: React.FormEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    }
  ) => void;
  handlePhoneMask: (
    e: React.FormEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    }
  ) => void;
  handleGenderChange: (e: OptionType) => void;
  handleCompanyChange: (e: OptionType) => void;
  handleCpfOrCnpjMask: (
    e: React.FormEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    }
  ) => void;
  handleCountryChange: (e: OptionType) => void;
  handleCepMask: (
    e: React.FormEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    }
  ) => void;
  handleGetAPIAdressInformation: (
    e: React.FocusEvent<HTMLInputElement>
  ) => Promise<void>;
  companiesOptions: OptionType[];
  handleStateChange: (e: OptionType) => void;
  fetchCep: boolean;
  streetValue: string;
  stateValue: string;
  cityValue: string;
  cpfValue: string;
  loading: boolean;
};

const SignupClientMemoized = ({
  onSubmit,
  handleDateMask,
  handlePhoneMask,
  handleGenderChange,
  handleCompanyChange,
  handleCpfOrCnpjMask,
  handleCountryChange,
  handleCepMask,
  handleGetAPIAdressInformation,
  companiesOptions,
  handleStateChange,
  fetchCep,
  streetValue,
  stateValue,
  cityValue,
  cpfValue,
  loading,
}: ClientPageProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({});

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Dados Pessoais</h1>
      <S.FormSection>
        <InputComponent width="276px" secondary name="name" label="Nome:">
          <S.Input type="text" {...register("name")} />
        </InputComponent>
        <InputComponent secondary name="birth_date" label="Data de Nascimento:">
          <S.Input
            maxLength={10}
            placeholder="dd/MM/yyyy"
            type="text"
            {...register("birth_date")}
            onChange={(e) => handleDateMask(e)}
          />
        </InputComponent>
        <InputComponent
          width="180px"
          secondary
          name="phone_number"
          label="Telefone:"
        >
          <S.Input
            type="tel"
            maxLength={12}
            placeholder="+55 99999-9999"
            {...register("phone_number")}
            onChange={(e) => handlePhoneMask(e)}
          />
        </InputComponent>
        <InputComponent secondary name="gender" label="Gênero:" width="80px">
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
          width="180px"
          secondary
          name="company_id"
          label="Empresa:"
        >
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                styles={{
                  control: (base) => ({
                    ...base,
                    ...reactSelectedStyleSigupPage,
                  }),
                }}
                options={companiesOptions}
                onChange={(e) => handleCompanyChange(e as OptionType)}
              />
            )}
          />
        </InputComponent>
        <InputComponent width="256px" secondary name="email" label="Email:">
          <S.Input type="email" {...register("email")} />
        </InputComponent>
        <InputComponent
          width="170px"
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
        <InputComponent width="149px" secondary name="password" label="Senha:">
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
        <InputComponent width="200px" secondary name="address.cep" label="CEP:">
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
          {!loading ? (
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
  );
};

export const SignupClient = memo(SignupClientMemoized);
