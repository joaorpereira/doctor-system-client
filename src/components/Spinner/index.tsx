import React from "react";
import * as S from "./styled";

type SpinnerProps = {
  loading?: boolean;
  size: string;
  style?: React.CSSProperties;
};

const SpinnerComponent = ({ loading, size, ...props }: SpinnerProps) => (
  <S.StyledSpinner viewBox="0 0 50 50" loading={loading} {...props} size={size}>
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </S.StyledSpinner>
);

const Spinner = React.memo(SpinnerComponent);
export default Spinner;
