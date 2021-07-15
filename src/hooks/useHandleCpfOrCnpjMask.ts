import React, { useCallback, Dispatch } from "react";
import { normalizeCPForCNPJ } from "../utils/helpers";

type Props = {
  setCpfValue: Dispatch<React.SetStateAction<string>>;
};

const useHandleCpfOrCnpjMask = ({ setCpfValue }: Props) => {
  const handleCpfOrCnpjMask = useCallback(
    (e: React.FormEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
      const { value } = e.target;
      e.target.value = normalizeCPForCNPJ(value);
      setCpfValue(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [handleCpfOrCnpjMask];
};

export default useHandleCpfOrCnpjMask;
