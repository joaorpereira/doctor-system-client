import * as S from "./styled";

import { MdClear } from "react-icons/md";
import { File } from "../../store/ducks/servicesSlice";
import { BUCKET_URL } from "../../utils";

type Props = {
  images: File[];
  handleRemoveImage: () => void;
  showUpdate: () => boolean;
};

const ImageItem = ({ images, handleRemoveImage, showUpdate }: Props) => {
  return (
    <>
      {images &&
        images.map((image) => (
          <S.Box key={image._id}>
            <S.Image src={`${BUCKET_URL}${image.folder}`} alt={image.folder} />
            {showUpdate() ? (
              <S.RemoveButton onClick={() => handleRemoveImage()}>
                <MdClear size={23} color="#c70000" />
              </S.RemoveButton>
            ) : null}
          </S.Box>
        ))}
    </>
  );
};

export default ImageItem;
