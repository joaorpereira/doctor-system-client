import { useAppDispatch } from "../../../hooks/hooks";
import {
  Service,
  updateService,
  createService,
} from "../../../store/ducks/servicesSlice";

type OnSubmitProps = {
  type: string;
  id: string;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
  company_id?: string;
  files?: string[];
};

const useOnSubmit = ({
  id,
  type,
  setShowProfile,
  company_id,
  files,
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = (data: Service) => {
    if (type === "update") {
      dispatch(
        updateService({
          services: {
            service: data,
            files: files,
          },
          id: id,
        })
      );
    } else if (type === "create") {
      dispatch(
        createService({
          services: {
            service: data,
            files: files,
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
