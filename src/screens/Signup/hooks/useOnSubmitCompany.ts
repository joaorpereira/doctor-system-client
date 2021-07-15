import { useAppDispatch } from "../../../hooks";
import { createCompany } from "../../../store/ducks/companiesSlice";
import { reversePhoneNumberFormat } from "../../../utils";

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
}: Props) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitCompany = (data: any) => {
    const newPhoneNumber = reversePhoneNumberFormat(phoneValue);
    const newDocumentNumber = cpfValue.replace(/\D+/g, "");
    const cord_x = Number(data.geolocation.coordinates.x);
    const cord_y = Number(data.geolocation.coordinates.y);

    const newAddress = {
      ...data.address,
      country: countryValue.toLowerCase(),
      state: stateValue,
      cep: cepValue,
      city: cityValue,
      street: streetValue,
    };

    const newGeolocation = {
      type: "Point",
      coordinates: [cord_x, cord_y],
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
            geolocation: newGeolocation,
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
