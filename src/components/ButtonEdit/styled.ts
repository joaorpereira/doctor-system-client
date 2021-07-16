import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { colors } from "../../styles";

export const ButtonEdit = styled(MdEdit)`
  position: absolute;
  top: 0;
  right: 68%;
  cursor: pointer;
  color: white;
  background-color: ${colors.primary};
  padding: 3px;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
