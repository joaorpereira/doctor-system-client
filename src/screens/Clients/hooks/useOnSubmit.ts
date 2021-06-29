import { ClientProps } from "..";
import { useAppDispatch } from "../../../hooks/hooks";
import { createClient, updateClient } from "../../../store/ducks/clientsSlice";

type OnSubmitProps = {
  isUpdate: string;
  client: ClientProps;
  showUpdate: () => boolean;
};

const useOnSubmit = ({ client, showUpdate, isUpdate }: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = (data: ClientProps) => {
    const clientData = { ...client, ...data };
    if (showUpdate()) dispatch(updateClient({ clientData, id: client._id }));
    else if (isUpdate === "create")
      dispatch(
        createClient({ clientData, company_id: "60b281d55398c39f2a93cd21" })
      );
  };

  return [onSubmit];
};

export default useOnSubmit;
