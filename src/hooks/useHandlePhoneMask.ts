import React, { useCallback, Dispatch } from "react";
import { formatPhone } from "../utils/helpers";

type Props = {
  setPhoneValue: Dispatch<React.SetStateAction<string>>;
};
const useHandlePhoneMask = ({ setPhoneValue }: Props) => {
  const handlePhoneMask = useCallback(
    (e: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
      const { value } = e.target;
      e.target.value = formatPhone(value);
      setPhoneValue(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [handlePhoneMask];
};

export default useHandlePhoneMask;
