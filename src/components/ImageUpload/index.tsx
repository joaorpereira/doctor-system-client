import ImageUploading, { ImageListType } from "react-images-uploading";
import * as S from "./styled";

import { MdAddBox, MdClear } from "react-icons/md";

type ImageUploadProps = {
  onChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined
  ) => void;
  maxNumber: number;
  images: never[];
};

export const ImageUpload = ({
  onChange,
  maxNumber,
  images,
}: ImageUploadProps) => {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemove,
        isDragging,
        dragProps,
      }: any) => (
        <S.Wrapper>
          {imageList.map((image: any, index: number) => (
            <S.Box key={index}>
              <S.Image src={image.dataURL} alt={image.dataURL} />
              <S.RemoveButton onClick={() => onImageRemove(index)}>
                <MdClear size={23} color="#c70000" />
              </S.RemoveButton>
            </S.Box>
          ))}
          <S.AddButton
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            <MdAddBox size={60} color="#fff" />
          </S.AddButton>
        </S.Wrapper>
      )}
    </ImageUploading>
  );
};
