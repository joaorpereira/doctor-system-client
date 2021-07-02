import { OptionsType } from "react-select";
import { useAppDispatch } from "../../../hooks/hooks";
import {
  createWorker,
  updateWorker,
  Worker,
} from "../../../store/ducks/workersSlice";
import { OptionType } from "../../../utils/globalTypes";
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
  company_id?: string;
  services: OptionsType<OptionType>;
};

const useOnSubmit = ({
  id,
  type,
  setShowProfile,
  documentType,
  genderValue,
  company_id,
  services,
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = (data: Worker) => {
    const newPhoneNumber = reversePhoneNumberFormat(data.phone_number);
    const newBirthDate = reverseBirthDateFormat(data.birth_date);
    const newDocumentNumber = reverseDocumentNumberFormat(data.document);
    const newServices = services.map((service) => service.value);

    if (type === "update") {
      dispatch(
        updateWorker({
          worker: {
            ...data,
            phone_number: newPhoneNumber,
            services: services,
          },
          id: id,
        })
      );
    } else if (type === "create") {
      dispatch(
        createWorker({
          worker: {
            ...data,
            phone_number: newPhoneNumber,
            birth_date: newBirthDate,
            document: { number: newDocumentNumber, type: documentType },
            gender: genderValue,
            services: newServices,
          },
          company_id: company_id,
        })
      );
    }
    setShowProfile(false);
  };

  return [onSubmit];
};

export default useOnSubmit;
