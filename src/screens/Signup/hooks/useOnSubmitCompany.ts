import { useAppDispatch } from "../../../hooks";
import { createCompany } from "../../../store/ducks/companiesSlice";
import { reversePhoneNumberFormat } from "../../../utils";

type GeoLocation = {
  type: string;
  coordinates: number[];
};
interface Props {
  cpfValue: string;
  cepValue: string;
  phoneValue: string;
  stateValue: string;
  countryValue: string;
  streetValue: string;
  cityValue: string;
  pictureValue: string;
  backgroundImageValue: string;
  accountTypeValue: string;
  bankCodeValue: string;
  coordinates: GeoLocation;
}

const useOnSubmitCompany = ({
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
}: Props) => {
  const dispatch = useAppDispatch();

  const onSubmitCompany = (data: any) => {
    const newPhoneNumber = reversePhoneNumberFormat(phoneValue);
    const newDocumentNumber = cpfValue.replace(/\D+/g, "");

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
      cpf_or_cnpj: newDocumentNumber,
      acc_type: accountTypeValue,
      bank_code: bankCodeValue,
    };

    try {
      dispatch(
        createCompany({
          company: {
            ...data,
            picture: pictureValue,
            background: backgroundImageValue,
            phone_number: newPhoneNumber,
            address: newAddress,
            geolocation: coordinates,
            bank_account: newBankAccount,
          },
          isSignUp: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return [onSubmitCompany];
};

export default useOnSubmitCompany;
