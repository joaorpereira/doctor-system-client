import { FieldValues, UseFormReset } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/hooks";
import { setWorker, Worker } from "../../../store/ducks/workersSlice";

type UpdateShowWorkerProps = {
  worker?: Worker;
  type: string;
};

type UpdateOrShowProps = {
  handleCloseModal: () => void;
  reset: UseFormReset<FieldValues>;
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
  setGenderValue: React.Dispatch<React.SetStateAction<string>>;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
};

const useHandleUpdateOrShowWorker = ({
  handleCloseModal,
  reset,
  setDocumentType,
  setGenderValue,
  setAccountType,
}: UpdateOrShowProps) => {
  const dispatch = useAppDispatch();
  const handleUpdateOrShowWorker = ({
    worker,
    type,
  }: UpdateShowWorkerProps) => {
    reset();
    handleCloseModal();
    if (type === "show") {
      dispatch(setWorker({ worker, type }));
    } else if (type === "update") {
      dispatch(setWorker({ worker, type }));
    } else {
      setDocumentType("");
      setGenderValue("");
      setAccountType("");
      dispatch(setWorker({ worker: {}, type }));
    }
  };

  return [handleUpdateOrShowWorker];
};

export default useHandleUpdateOrShowWorker;
