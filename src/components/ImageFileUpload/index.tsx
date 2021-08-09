import React from "react";
import Avatar from "../../assets/avatar.png";
import { ButtonEdit } from "../ButtonEdit/styled";
import * as S from "./styled";

type Props = {
  picture: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Record<string, any>;
  userName: string;
  show: () => boolean;
};

const ImageFileUpload: React.FC<Props> = ({
  picture,
  user,
  userName,
  show,
}: Props) => {
  return (
    <S.ImageFile>
      {!show() && <ButtonEdit size={24} />}
      <img src={picture ? picture : Avatar} alt={user ? userName : "avatar"} />
    </S.ImageFile>
  );
};

export default ImageFileUpload;
