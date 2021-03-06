import { OptionsType } from "react-select";
import { useAppDispatch } from "..";
import {
  createWorker,
  updateWorker,
  Worker,
} from "../../store/ducks/workersSlice";
import { OptionType } from "../../utils/types";
import {
  reverseBirthDateFormat,
  reverseDocumentNumberFormat,
  reversePhoneNumberFormat,
} from "../../utils/helpers/functions";
import { actionsTypes } from "../../utils";

type OnSubmitProps = {
  type: string;
  id: string;
  documentType: string;
  genderValue: string;
  company_id?: string;
  services: OptionsType<OptionType>;
  accountType: string;
  image: string;
  setImage: React.Dispatch<
    React.SetStateAction<Record<string, unknown> | null>
  >;
};

const useOnSubmitWorker = ({
  id,
  type,
  documentType,
  genderValue,
  company_id,
  services,
  accountType,
  image,
  setImage,
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = (data: Worker) => {
    const newPhoneNumber = reversePhoneNumberFormat(data.phone_number);
    const newBirthDate = reverseBirthDateFormat(data.birth_date);
    const newDocumentNumber = reverseDocumentNumberFormat(data.document);
    const newServices = services.map((service) => service.value);

    if (type === actionsTypes.UPDATE) {
      dispatch(
        updateWorker({
          worker: {
            ...data,
            phone_number: newPhoneNumber,
            services: newServices,
            picture: image,
          },
          id: id,
        })
      );
      setImage(null);
    } else if (type === actionsTypes.CREATE) {
      dispatch(
        createWorker({
          worker: {
            ...data,
            phone_number: newPhoneNumber,
            birth_date: newBirthDate,
            document: { number: newDocumentNumber, type: documentType },
            gender: genderValue,
            services: newServices,
            bank_account: {
              ...data.bank_account,
              acc_type: accountType,
            },
          },
          company_id: company_id,
        })
      );
    }
  };

  return [onSubmit];
};

export default useOnSubmitWorker;
