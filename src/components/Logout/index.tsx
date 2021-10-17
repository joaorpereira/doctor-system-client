import React, { useRef } from "react";
import { useOnClickOutside } from "../../hooks";
import * as S from "./styled";

type Props = {
  handleConfiguration: () => void;
  handleLogout: () => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Logout: React.FC<Props> = ({
  handleConfiguration,
  handleLogout,
  showModal = false,
  setShowModal,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside({ ref, handler: () => setShowModal(false) });
  return (
    <S.Wrapper ref={ref} showModal={showModal}>
      <ul>
        <S.Link>
          <S.Btn onClick={handleConfiguration}>Configurações</S.Btn>
        </S.Link>
        <S.Link>
          <S.Btn onClick={handleLogout}>Sair</S.Btn>
        </S.Link>
      </ul>
    </S.Wrapper>
  );
};

export default Logout;
