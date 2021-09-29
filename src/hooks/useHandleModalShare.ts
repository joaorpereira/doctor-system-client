import { useState } from "react";
import { Client } from "../store/ducks/clientsSlice";

const useHandleModalShare = () => {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [rowData, setRowData] = useState<Client | Record<string, unknown>>({});

  const handleShare = (row: Client) => {
    setRowData(row);
    setOpenShareModal(true);
  };

  return { handleShare, rowData, openShareModal, setOpenShareModal };
};

export default useHandleModalShare;
