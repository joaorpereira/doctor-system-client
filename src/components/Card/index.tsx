import React, { ReactNode, useRef } from "react";
import { useOnClickOutside } from "../../hooks";
import * as S from "./styled";

type Props = {
  children: ReactNode;
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const Card: React.FC<Props> = ({ children, showProfile, setShowProfile }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

  return (
    <S.Card ref={ref} showProfile={showProfile}>
      {children}
    </S.Card>
  );
};

export default Card;
