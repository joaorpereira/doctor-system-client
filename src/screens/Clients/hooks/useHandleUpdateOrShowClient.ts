import { FieldValues, UseFormReset } from "react-hook-form";
import { useAppDispatch } from "../../../hooks";
import { Client, setClient } from "../../../store/ducks/clientsSlice";

type UpdateShowClientProps = {
  client?: Client;
  type: string;
};

type UpdateOrShowProps = {
  handleCloseModal: () => void;
  reset: UseFormReset<FieldValues>;
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
  setGenderValue: React.Dispatch<React.SetStateAction<string>>;
};

const useHandleUpdateOrShowClient = ({
  handleCloseModal,
  reset,
  setDocumentType,
  setGenderValue,
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
      setDocumentType("");
      setGenderValue("");
      dispatch(setClient({ client: {}, type }));
    }
  };

  return [handleUpdateOrShowClient];
};

export default useHandleUpdateOrShowClient;
