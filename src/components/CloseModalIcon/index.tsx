import { MdFastForward } from "react-icons/md";
import * as S from "./styled";

type CloseIconProps = {
  handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
};

export const CloseModalIcon = ({ handleCloseModal }: CloseIconProps) => (
  <S.CloseIcon onClick={handleCloseModal}>
    <MdFastForward size={20} color="#fff" style={{ marginRight: "4px" }} />
  </S.CloseIcon>
);
