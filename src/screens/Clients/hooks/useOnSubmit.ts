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
} from "../../../utils/helpers";

type OnSubmitProps = {
  type: string;
  id: string;
  documentType: string;
  genderValue: string;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const useOnSubmit = ({
  id,
  type,
  setShowProfile,
  documentType,
  genderValue,
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
          },
          company_id: "60b281d55398c39f2a93cd21",
        })
      );
    }
    setShowProfile(false);
  };

  return [onSubmit];
};

export default useOnSubmit;
