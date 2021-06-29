import { Dispatch, SetStateAction } from "react";

type ShoPasswordProps = {
  setShowPassword: Dispatch<
    SetStateAction<{ password: boolean; password2: boolean }>
  >;
  showPassword: {
    password: boolean;
    password2: boolean;
  };
};

const useHandleShowPassword = ({
  setShowPassword,
  showPassword,
}: ShoPasswordProps) => {
  const handleShowPassword = (type: string) => {
    if (type === "password")
      setShowPassword({ ...showPassword, password: !showPassword.password });
    else if (type === "password2")
      setShowPassword({ ...showPassword, password2: !showPassword.password2 });
  };
  return [handleShowPassword];
};

export default useHandleShowPassword;
