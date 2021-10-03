import { useAppDispatch } from "../../../hooks";
import {
  Client,
  createClient,
  updateClient,
} from "../../../store/ducks/clientsSlice";
import {
  reverseBirthDateFormat,
  reverseDocumentNumberFormat,
  reversePhoneNumberFormat,
} from "../../../utils";

type OnSubmitProps = {
  type: string;
  id: string | undefined;
  documentType: string;
  genderValue: string;
  company_id?: string;
  image: Record<string, unknown>;
};

const useOnSubmit = ({
  id,
  type,
  documentType,
  genderValue,
  company_id,
  image,
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = (data: Client) => {
    const newPhoneNumber = reversePhoneNumberFormat(data.phone_number);
    const newBirthDate = reverseBirthDateFormat(data.birth_date);
    const newDocumentNumber = reverseDocumentNumberFormat(data.document);

    if (type === "update") {
      dispatch(
        updateClient({
          client: {
            ...data,
            phone_number: newPhoneNumber,
            birth_date: newBirthDate,
            picture: image,
          },
          id: id,
        })
      );
    } else if (type === "create") {
      dispatch(
        createClient({
          client: {
            ...data,
            phone_number: newPhoneNumber,
            birth_date: newBirthDate,
            document: { number: newDocumentNumber, type: documentType },
            gender: genderValue,
            picture: image,
          },
          company_id: company_id,
        })
      );
    }
  };

  return [onSubmit];
};

export default useOnSubmit;
