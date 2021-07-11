import React from "react";
import * as S from "./styled";

const SpinnerComponent = (props: any) => (
  <S.StyledSpinner
    viewBox="0 0 50 50"
    loading={props.loading}
    {...props}
    size={props.size}
  >
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

export const Spinner = React.memo(SpinnerComponent);
