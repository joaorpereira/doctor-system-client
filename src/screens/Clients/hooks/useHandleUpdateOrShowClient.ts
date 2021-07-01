import { FieldValues, UseFormReset } from "react-hook-form";
import { ClientProps } from "..";
import { useAppDispatch } from "../../../hooks/hooks";
import { setClient } from "../../../store/ducks/clientsSlice";

type UpdateShowClientProps = {
  client?: ClientProps;
  type: string;
};

type UpdateOrShowProps = {
  handleCloseModal: () => void;
  reset: UseFormReset<FieldValues>;
};

const useHandleUpdateOrShowClient = ({
  handleCloseModal,
  reset,
}: UpdateOrShowProps) => {
  const dispatch = useAppDispatch();
  const handleUpdateOrShowClient = ({
    client,
    type,
  }: UpdateShowClientProps) => {
    reset();
    handleCloseModal();
    if (type === "show") {
      dispatch(setClient({ client, type }));
    } else if (type === "update") {
      dispatch(setClient({ client, type }));
    } else {
      dispatch(setClient({ client: {}, type }));
    }
  };

  return [handleUpdateOrShowClient];
};

export default useHandleUpdateOrShowClient;
