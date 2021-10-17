import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import * as S from "./styled";

import { Spinner, InputComponent } from "../../../components";
import {
  accountsTypesOptions,
  countries,
  states,
  bankList,
} from "../../../utils";
import { OptionType } from "../../../utils/types";
import { reactSelectedStyleSigupPage } from "../../../styles";

type CompanyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  handlePhoneMask: (
    e: React.FormEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    }
  ) => void;
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
  handleStateChange: (e: OptionType) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePicture: (e: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBackgroundImage: (e: any) => void;
  handleAccountType: (e: OptionType) => void;
  handleBankCode: (e: OptionType) => void;
  fetchCep: boolean;
  streetValue: string;
  stateValue: string;
  cityValue: string;
  cpfValue: string;
  bankInfoPage: boolean;
  setBankInfoPage: (value: React.SetStateAction<boolean>) => void;
  loading: boolean;
};

const SignupCompanyMemoized = ({
  onSubmit,
  handlePhoneMask,
  handleCpfOrCnpjMask,
  handleCountryChange,
  handleCepMask,
  handleGetAPIAdressInformation,
  handleStateChange,
  handlePicture,
  handleBackgroundImage,
  handleAccountType,
  handleBankCode,
  fetchCep,
  streetValue,
  stateValue,
  cityValue,
  cpfValue,
  bankInfoPage,
  setBankInfoPage,
  loading,
}: CompanyProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({});

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {!bankInfoPage ? (
        <>
          <S.InputImageContainer>
            <S.InputImage
              type="file"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handlePicture(e)}
            />
            <S.InputImage
              type="file"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleBackgroundImage(e)}
            />
          </S.InputImageContainer>
          <h1>Dados da Empresa</h1>
          <S.FormSection>
            <InputComponent width="295px" secondary name="name" label="Nome:">
              <S.Input type="text" autoComplete="off" {...register("name")} />
            </InputComponent>
            <InputComponent width="295px" secondary name="email" label="Email:">
              <S.Input type="email" autoComplete="off" {...register("email")} />
            </InputComponent>
            <InputComponent
              width="180px"
              secondary
              name="phone_number"
              label="Telefone:"
            >
              <S.Input
                type="tel"
                autoComplete="off"
                maxLength={12}
                placeholder="+55 99999-9999"
                {...register("phone_number")}
                onChange={(e) => handlePhoneMask(e)}
              />
            </InputComponent>

            <InputComponent
              width="200px"
              secondary
              name="password"
              label="Senha:"
            >
              <S.Input
                autoComplete="new-password"
                type="password"
                {...register("password")}
              />
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
                    value={countries.filter(
                      (option: OptionType) => option.value === "BR"
                    )}
                    options={countries}
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
              <S.Input
                type="text"
                autoComplete="off"
                {...register("address.number")}
              />
            </InputComponent>
          </S.FormSection>
        </>
      ) : (
        <>
          <h1>Dados Bancários</h1>
          <S.FormSection>
            <InputComponent
              width="285px"
              secondary
              name="bank_account.acc_user_name"
              label="Titular:"
            >
              <S.Input
                type="text"
                autoComplete="off"
                {...register("bank_account.acc_user_name")}
              />
            </InputComponent>
            <InputComponent
              width="285px"
              secondary
              name="bank_account.cpf_or_cnpj"
              label="CPF/CNPJ:"
            >
              <S.Input
                type="text"
                autoComplete="off"
                value={cpfValue}
                {...register("bank_account.cpf_or_cnpj")}
                onChange={(e) => handleCpfOrCnpjMask(e)}
              />
            </InputComponent>
            <InputComponent
              secondary
              name="bank_account.bank_code"
              label="Banco:"
              width="218px"
            >
              <Controller
                name="bank_account.bank_code"
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
                    placeHolder=""
                    options={bankList}
                    onChange={(e) => handleBankCode(e as OptionType)}
                  />
                )}
              />
            </InputComponent>
            <InputComponent
              width="218px"
              secondary
              name="bank_account.acc_type"
              label="Tipo da Conta:"
            >
              <Controller
                name="bank_account.acc_type"
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
                    placeHolder=""
                    options={accountsTypesOptions}
                    onChange={(e) => handleAccountType(e as OptionType)}
                  />
                )}
              />
            </InputComponent>
            <InputComponent
              width="218px"
              secondary
              name="bank_account.bank_agency"
              label="Agência:"
            >
              <S.Input
                type="text"
                autoComplete="off"
                {...register("bank_account.bank_agency")}
              />
            </InputComponent>
            <InputComponent
              width="218px"
              secondary
              name="bank_account.acc_number"
              label="Número:"
            >
              <S.Input
                type="text"
                autoComplete="off"
                {...register("bank_account.acc_number")}
              />
            </InputComponent>
            <InputComponent
              width="100px"
              secondary
              name="bank_account.verify_digit"
              label="Dígito:"
            >
              <S.Input
                type="text"
                autoComplete="off"
                {...register("bank_account.verify_digit")}
              />
            </InputComponent>
          </S.FormSection>
        </>
      )}
      <S.BtnDiv>
        {bankInfoPage ? (
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
        ) : (
          <S.SpanButton onClick={() => setBankInfoPage(true)}>
            <p>Próximo</p>
          </S.SpanButton>
        )}
      </S.BtnDiv>
    </S.Form>
  );
};

export const SignupCompany = memo(SignupCompanyMemoized);
