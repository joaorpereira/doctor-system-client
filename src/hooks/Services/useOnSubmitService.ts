import { useAppDispatch } from "..";
import {
  Service,
  updateService,
  createService,
} from "../../store/ducks/servicesSlice";
import { actionsTypes } from "../../utils";

type OnSubmitProps = {
  type: string;
  id?: string;
  statusValue: string;
  companyValue?: string;
  durationValue: string;
  images: never[];
};

const useOnSubmitService = ({
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
    } as Service;

    if (type === actionsTypes.UPDATE) {
      dispatch(
        updateService({
          id: id,
          service: { ...newForm },
          files: images,
        })
      );
    } else if (type === actionsTypes.CREATE) {
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

export default useOnSubmitService;
