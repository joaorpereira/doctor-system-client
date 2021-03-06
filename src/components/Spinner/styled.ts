import styled from "styled-components";
import { colors } from "../../styles";

type Props = {
  size: string;
  loading?: boolean;
  color?: string;
};

export const StyledSpinner = styled.svg<Props>`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: ${({ size }) => size && size};
  height: ${({ size }) => size && size};
  position: ${({ loading }) => loading && "absolute"};
  right: ${({ loading }) => loading && "0"};
  bottom: ${({ loading }) => loading && "0"};
  margin: ${({ loading }) => loading && "7px"};

  & .path {
    stroke: ${({ color }) => (color ? color : `${colors.primary}`)};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
