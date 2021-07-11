import { useAppDispatch } from "../../../hooks/hooks";
import { createClient } from "../../../store/ducks/clientsSlice";
import {
  reverseBirthDateFormat,
  reversePhoneNumberFormat,
} from "../../../utils/helpers";

type OnSubmitProps = {
  genderValue: string;
  cpfValue: string;
  cepValue: string;
  phoneValue: string;
  dateValue: string;
  stateValue: string;
  countryValue: string;
  streetValue: string;
  cityValue: string;
  setGenderValue: React.Dispatch<React.SetStateAction<string>>;
  setCpfValue: React.Dispatch<React.SetStateAction<string>>;
  setCepValue: React.Dispatch<React.SetStateAction<string>>;
  setPhoneValue: React.Dispatch<React.SetStateAction<string>>;
  setDateValue: React.Dispatch<React.SetStateAction<string>>;
  setStateValue: React.Dispatch<React.SetStateAction<string>>;
  setCityValue: React.Dispatch<React.SetStateAction<string>>;
  setStreetValue: React.Dispatch<React.SetStateAction<string>>;
  setCountryValue: React.Dispatch<React.SetStateAction<string>>;
};

const useOnSubmit = ({
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
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = (data: any) => {
    const newPhoneNumber = reversePhoneNumberFormat(phoneValue);
    const newBirthDate = reverseBirthDateFormat(dateValue);
    const newDocumentNumber = cpfValue.replace(/\D+/g, "");

    dispatch(
      createClient({
        client: {
          ...data,
          birth_date: newBirthDate,
          phone_number: newPhoneNumber,
          gender: genderValue,
          document: {
            number: newDocumentNumber,
            type: cpfValue.length > 14 ? "cnpj" : "cpf",
          },
          address: {
            ...data.address,
            country: countryValue.toLowerCase(),
            state: stateValue,
            cep: cepValue,
            city: cityValue,
            street: streetValue,
          },
        },
        company_id: "60b281d55398c39f2a93cd21",
      })
    );

    setGenderValue("");
    setCpfValue("");
    setCepValue("");
    setPhoneValue("");
    setDateValue("");
    setStateValue("");
    setCityValue("");
    setStreetValue("");
    setCountryValue("");
  };

  return [onSubmit];
};

export default useOnSubmit;
