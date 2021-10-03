import React from "react";
import Avatar from "../../assets/avatar.png";
import * as S from "./styled";

type Props = {
  picture: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Record<string, any>;
  userName: string;
  show: boolean;
  setImage?: any;
};

const ImageFileUpload: React.FC<Props> = ({
  picture,
  user,
  userName,
  show,
  setImage,
}: Props) => {
  return (
    <S.ImageFile>
      {show && (
        <label htmlFor="fileEdit">
          <S.ButtonEdit size={20} />
          <S.Input
            id="fileEdit"
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : "")}
          />
        </label>
      )}
      <img src={picture ? picture : Avatar} alt={user ? userName : "avatar"} />
    </S.ImageFile>
  );
};

export default ImageFileUpload;
