import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { colors } from "../../styles";

export const ImageFile = styled.div`
  position: relative;
  display: flex;
  margin-right: 40px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: rgba(6, 24, 44, 0.1) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.2) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }
`;

export const ButtonEdit = styled(MdEdit)`
  position: absolute;
  top: 10%;
  left: 18%;
  cursor: pointer;
  color: white;
  background-color: ${colors.primary};
  padding: 3px;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
