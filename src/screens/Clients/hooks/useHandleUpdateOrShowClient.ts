import { FieldValues, UseFormReset } from "react-hook-form";
import { ClientProps } from "..";
import { useAppDispatch } from "../../../hooks/hooks";
import { setClientInfo } from "../../../store/ducks/clientsSlice";

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
    handleCloseModal();
    // update or create client
    if (client) dispatch(setClientInfo({ client, type }));
    // show client details
    else reset(), dispatch(setClientInfo({ client: {}, type }));
  };

  return [handleUpdateOrShowClient];
};

export default useHandleUpdateOrShowClient;
