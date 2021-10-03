import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

type UpdatePictureProps = {
  image: Record<string, unknown> | null;
  handleUpdate: ActionCreatorWithPayload<any, string>;
  role: string;
  id: string;
};

const useUpdatePicture = () => {
  const dispatch = useDispatch();

  const handleUpdatePicture = useCallback(
    ({ image, handleUpdate, role, id }: UpdatePictureProps) => {
      dispatch(
        handleUpdate({
          id,
          role,
          files: [image],
        })
      );
    },
    [dispatch]
  );

  return { handleUpdatePicture };
};

export default useUpdatePicture;
