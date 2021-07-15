import * as S from "./styled";

import { MdClear } from "react-icons/md";

type ImageProps = {
  created_at: string;
  folder: string;
  model: string;
  reference_id: string;
  updated_at: string;
  __v: number;
  _id: string;
};

type Props = {
  images: ImageProps[];
  handleRemoveImage: () => void;
};

const ImageItem = ({ images, handleRemoveImage }: Props) => {
  const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;
  return (
    <>
      {images &&
        images.map((image) => (
          <S.Box key={image._id}>
            <S.Image src={`${BUCKET_URL}${image.folder}`} alt={image.folder} />
            <S.RemoveButton onClick={() => handleRemoveImage()}>
              <MdClear size={23} color="#c70000" />
            </S.RemoveButton>
          </S.Box>
        ))}
    </>
  );
};

export default ImageItem;
