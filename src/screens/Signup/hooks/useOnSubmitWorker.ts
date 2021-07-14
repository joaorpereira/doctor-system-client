import { OptionsType } from "react-select";
import { useAppDispatch } from "../../../hooks/hooks";
import { history } from "../../../services/history";
import { createWorker } from "../../../store/ducks/workersSlice";
import { OptionType } from "../../../utils/globalTypes";
import {
  reverseBirthDateFormat,
  reversePhoneNumberFormat,
} from "../../../utils/helpers";

interface Props {
  genderValue: string;
  cpfValue: string;
  cepValue: string;
  phoneValue: string;
  dateValue: string;
  stateValue: string;
  countryValue: string;
  streetValue: string;
  cityValue: string;
  companyValue: string;
  pictureValue: string;
  accountTypeValue: string;
  bankCodeValue: string;
  cpfOrCnpjBankCode?: string;
  selectedServices: OptionsType<OptionType>;
}

const useOnSubmitWorker = ({
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
  accountTypeValue,
  bankCodeValue,
  selectedServices,
  cpfOrCnpjBankCode,
}: Props) => {
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    const newPhoneNumber = reversePhoneNumberFormat(phoneValue);
    const newBirthDate = reverseBirthDateFormat(dateValue);
    const newBankNumber = cpfOrCnpjBankCode?.replace(/\D+/g, "");

    const newAddress = {
      ...data.address,
      country: countryValue.toLowerCase(),
      state: stateValue,
      cep: cepValue,
      city: cityValue,
      street: streetValue,
    };

    const newBankAccount = {
      ...data.bank_account,
      cpf_or_cnpj: cpfValue.replace(/\D+/g, ""),
      acc_type: accountTypeValue,
      bank_code: bankCodeValue,
    };

    const newDocument = {
      number: cpfValue.replace(/\D+/g, ""),
      type: cpfValue.length > 14 ? "cnpj" : "cpf",
    };

    const newServices = selectedServices.map((service) => service.value);

    try {
      dispatch(
        createWorker({
          worker: {
            picture: pictureValue,
            phone_number: newPhoneNumber,
            address: newAddress,
            gender: genderValue,
            birth_date: newBirthDate,
            document: newDocument,
            bank_account: newBankAccount,
            services: newServices,
          },
          company_id: companyValue,
        })
      );
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return [onSubmit];
};

export default useOnSubmitWorker;
