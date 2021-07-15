import React, { useCallback, Dispatch } from "react";
import { maskDate } from "../utils";

type Props = {
  setDateValue: Dispatch<React.SetStateAction<string>>;
};

const useHandleDateMask = ({ setDateValue }: Props) => {
  const handlePhoneMask = useCallback(
    (e: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
      const { value } = e.target;
      e.target.value = maskDate(value);
      setDateValue(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [handlePhoneMask];
};

export default useHandleDateMask;
