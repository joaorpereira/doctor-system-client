import React from "react";
import Avatar from "../../assets/avatar.png";
import { BUCKET_URL } from "../../utils";
import * as S from "./styled";

type Props = {
  picture: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: Record<string, any>;
  userName: string;
  show: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleImage: (e: any) => void;
};

const ImageFileUpload: React.FC<Props> = ({
  picture,
  user,
  userName,
  show,
  handleImage,
}: Props) => {
  return (
    <S.ImageFile>
      {show && (
        <label htmlFor="fileEdit">
          <S.ButtonEdit size={20} />
          <S.Input
            id="fileEdit"
            type="file"
            onChange={(e) =>
              handleImage(e.target.files ? e.target.files[0] : "")
            }
          />
        </label>
      )}
      <img
        loading="lazy"
        src={picture ? `${BUCKET_URL}${picture}` : Avatar}
        alt={user ? userName : "avatar"}
      />
    </S.ImageFile>
  );
};

export default ImageFileUpload;
