import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect, { ValueType } from "react-select";
import * as S from "./styled";

import { Spinner } from "../../../components/Spinner";
import InputComponent from "../../../components/Input";
import {
  accountsTypesOptions,
  genderOptions,
  OptionType,
} from "../../../utils/globalTypes";
import { reactSelectedStyleSigupPage } from "../../../styles/global";
import { countryList } from "../../../utils/countries";
import { states } from "../../../utils/states";
import { bankList } from "../../../utils/banksList";

type Props = {
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
  handlePicture: (e: any) => void;
  handleAccountType: (e: OptionType) => void;
  handleBankCode: (e: OptionType) => void;
  fetchCep: boolean;
  streetValue: string;
  stateValue: string;
  cityValue: string;
  cpfValue: string;
  bankInfoPage: boolean;
  setBankInfoPage: (value: React.SetStateAction<boolean>) => void;
  companiesOptions: any;
  handleCompanyChange: (e: OptionType) => void;
  handleDateMask: (
    e: React.FormEvent<HTMLInputElement> & {
      target: HTMLInputElement;
    }
  ) => void;
  handleGenderChange: (e: OptionType) => void;
  handleServicesChange: (option: ValueType<OptionType, true>) => void;
  servicesOptions: any;
  loading: boolean;
};

const SignupWorkerMemoized = ({
  onSubmit,
  handlePhoneMask,
  handleCpfOrCnpjMask,
  handleCountryChange,
  handleCepMask,
  handleGetAPIAdressInformation,
  handleStateChange,
  handlePicture,
  handleAccountType,
  handleBankCode,
  fetchCep,
  streetValue,
  stateValue,
  cityValue,
  cpfValue,
  bankInfoPage,
  companiesOptions,
  servicesOptions,
  handleServicesChange,
  setBankInfoPage,
  handleCompanyChange,
  handleDateMask,
  handleGenderChange,
  loading,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({});

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {bankInfoPage && servicesOptions.length > 0 ? (
        <>
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
              width="297px"
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
          <h1>Dados Bancários</h1>
          <S.FormSection>
            <InputComponent
              width="275px"
              secondary
              name="bank_account.acc_user_name"
              label="Titular:"
            >
              <S.Input
                type="text"
                {...register("bank_account.acc_user_name")}
              />
            </InputComponent>
            <InputComponent
              width="275px"
              secondary
              name="bank_account.cpf_or_cnpj"
              label="CPF/CNPJ:"
            >
              <S.Input
                type="text"
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
              <S.Input type="text" {...register("bank_account.bank_agency")} />
            </InputComponent>
            <InputComponent
              width="218px"
              secondary
              name="bank_account.acc_number"
              label="Número:"
            >
              <S.Input type="text" {...register("bank_account.acc_number")} />
            </InputComponent>
            <InputComponent
              width="100px"
              secondary
              name="bank_account.verify_digit"
              label="Dígito:"
            >
              <S.Input type="text" {...register("bank_account.verify_digit")} />
            </InputComponent>
          </S.FormSection>
        </>
      ) : (
        <>
          <S.InputImageContainer>
            <S.InputImage
              type="file"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handlePicture(e)}
            />
          </S.InputImageContainer>
          <h1>Dados Pessoais</h1>
          <S.FormSection>
            <InputComponent width="276px" secondary name="name" label="Nome:">
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
              width="276px"
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
            <InputComponent width="276px" secondary name="email" label="Email:">
              <S.Input type="email" {...register("email")} />
            </InputComponent>
            <InputComponent
              width="218px"
              secondary
              name="password"
              label="Senha:"
            >
              <S.Input type="password" {...register("password")} />
            </InputComponent>
            <InputComponent
              width="276px"
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
          </S.FormSection>
          <h1>Especialidades</h1>
          <S.FormSection>
            <InputComponent width="100%" secondary name="services">
              <Controller
                name="document.services"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    isMulti
                    onChange={(option) => handleServicesChange(option)}
                    options={servicesOptions}
                    styles={{
                      control: (base) => ({
                        ...base,
                        ...reactSelectedStyleSigupPage,
                      }),
                    }}
                  />
                )}
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

export const SignupWorker = memo(SignupWorkerMemoized);
