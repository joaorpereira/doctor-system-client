import styled from "styled-components";
import { colors } from "../../../styles";

import { ReactComponent as Share } from "../../../assets/share-2.svg";
import { ReactComponent as Location } from "../../../assets/map-pin.svg";
import { ReactComponent as Call } from "../../../assets/phone-call.svg";

type IconButtonProps = {
  isSelected: boolean;
};

export const ShareIcon = styled(Share)`
  margin-bottom: 5px;
  height: 20px;
`;

export const LocationIcon = styled(Location)`
  margin-bottom: 5px;
  height: 20px;
`;
export const CallIcon = styled(Call)`
  margin-bottom: 5px;
  height: 20px;
`;

export const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: -2px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45%;
`;

export const IconButton = styled.button<IconButtonProps>`
  border: none;
  background-color: transparent;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-bottom: 5px;
  }

  p {
    font-size: 10px;
    color: ${({ isSelected }) =>
      isSelected ? colors.lightGreen : colors.text};
  }

  ${ShareIcon} {
    stroke: ${({ isSelected }) =>
      isSelected ? colors.lightGreen : colors.text};
  }
  ${LocationIcon} {
    stroke: ${({ isSelected }) =>
      isSelected ? colors.lightGreen : colors.text};
  }
  ${CallIcon} {
    stroke: ${({ isSelected }) =>
      isSelected ? colors.lightGreen : colors.text};
  }
`;

export const Button = styled.button`
  background-color: ${colors.lightGreen};
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  text-transform: uppercase;
  color: ${colors.white};
  font-weight: 700;
  margin-bottom: 5px;
`;

export const ScheduleLaterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    font-size: 11px;
  }
`;
