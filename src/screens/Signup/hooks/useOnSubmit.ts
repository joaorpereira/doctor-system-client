import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/hooks";
import { createClient } from "../../../store/ducks/clientsSlice";
import { createCompany } from "../../../store/ducks/companiesSlice";
import {
  reverseBirthDateFormat,
  reversePhoneNumberFormat,
} from "../../../utils/helpers";

interface OnSubmitProps {
  type: string;
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
  backgroundImageValue: string;
  accountTypeValue: string;
  bankCodeValue: string;
}

const useOnSubmit = ({
  type,
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
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit = (data: any) => {
    const newPhoneNumber = reversePhoneNumberFormat(phoneValue);
    const newBirthDate = reverseBirthDateFormat(dateValue);
    const newDocumentNumber = cpfValue.replace(/\D+/g, "");

    const newAddress = {
      ...data.address,
      country: countryValue.toLowerCase(),
      state: stateValue,
      cep: cepValue,
      city: cityValue,
      street: streetValue,
    };

    try {
      switch (type) {
        case "cliente":
          dispatch(
            createClient({
              client: {
                ...data,
                picture: pictureValue,
                birth_date: newBirthDate,
                phone_number: newPhoneNumber,
                gender: genderValue,
                document: {
                  number: newDocumentNumber,
                  type: cpfValue.length > 14 ? "cnpj" : "cpf",
                },
                address: newAddress,
              },
              company_id: companyValue,
            })
          );
          history.push("/");
          break;

        case "cliente":
          const cord_x = Number(data.geolocation.coordinates.x);
          const cord_y = Number(data.geolocation.coordinates.y);
          dispatch(
            createCompany({
              ...data,
              picture: pictureValue,
              background: backgroundImageValue,
              phone_number: newPhoneNumber,
              address: newAddress,
              geolocation: {
                type: "Point",
                coordinates: [cord_x, cord_y],
              },
              bank_account: {
                ...data.bank_account,
                cpf_or_cnpj: newDocumentNumber,
                acc_type: accountTypeValue,
                bank_code: bankCodeValue,
              },
            })
          );
          history.push("/");
          break;

        case "worker":
          break;
        default:
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [onSubmit];
};

export default useOnSubmit;
