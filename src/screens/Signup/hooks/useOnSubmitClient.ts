import { useAppDispatch } from "../../../hooks/hooks";
import { history } from "../../../services/history";
import { createClient } from "../../../store/ducks/clientsSlice";
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
}

export const useOnSubmitClient = ({
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
}: Props) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitClient = (data: any) => {
    const newPhoneNumber = reversePhoneNumberFormat(phoneValue);
    const newBirthDate = reverseBirthDateFormat(dateValue);

    const newAddress = {
      ...data.address,
      country: countryValue.toLowerCase(),
      state: stateValue,
      cep: cepValue,
      city: cityValue,
      street: streetValue,
    };

    const newDocument = {
      number: cpfValue.replace(/\D+/g, ""),
      type: cpfValue.length > 14 ? "cnpj" : "cpf",
    };

    try {
      dispatch(
        createClient({
          client: {
            ...data,
            picture: pictureValue,
            birth_date: newBirthDate,
            phone_number: newPhoneNumber,
            gender: genderValue,
            document: newDocument,
            address: newAddress,
          },
          company_id: companyValue,
        })
      );
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return [onSubmitClient];
};
