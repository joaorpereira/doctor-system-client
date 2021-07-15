import React, { useCallback, Dispatch } from "react";
import { formatCep } from "../utils/helpers";

type Props = {
  setCepValue: Dispatch<React.SetStateAction<string>>;
};

const useHandleCepMask = ({ setCepValue }: Props) => {
  const handlePhoneMask = useCallback(
    (e: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
      const { value } = e.target;
      e.target.value = formatCep(value);
      setCepValue(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [handlePhoneMask];
};

export default useHandleCepMask;
