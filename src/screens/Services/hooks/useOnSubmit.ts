import { useAppDispatch } from "../../../hooks";
import {
  Service,
  updateService,
  createService,
} from "../../../store/ducks/servicesSlice";

type OnSubmitProps = {
  type: string;
  id?: string;
  statusValue: string;
  companyValue?: string;
  durationValue: string;
  images: never[];
};

const useOnSubmit = ({
  id,
  type,
  statusValue,
  companyValue,
  durationValue,
  images,
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = (data: Service) => {
    const newForm = {
      ...data,
      company_id: companyValue,
      status: statusValue,
      service_duration: durationValue,
      price: Number(data.price),
      service_recurrence: Number(data.service_recurrence),
    };

    if (type === "update") {
      dispatch(
        updateService({
          id: id,
          service: { ...newForm },
          files: images,
        })
      );
    } else if (type === "create") {
      dispatch(
        createService({
          service: { ...newForm },
          files: images,
        })
      );
    }
  };

  return [onSubmit];
};

export default useOnSubmit;
