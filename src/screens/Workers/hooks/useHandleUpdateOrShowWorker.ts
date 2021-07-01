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
};

const useHandleUpdateOrShowWorker = ({
  handleCloseModal,
  reset,
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
      dispatch(setWorker({ worker: {}, type }));
    }
  };

  return [handleUpdateOrShowWorker];
};

export default useHandleUpdateOrShowWorker;
