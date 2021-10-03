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
  z-index: 99;
  top: 5.5%;
  left: 5.5%;
  cursor: pointer;
  color: white;
`;

export const Input = styled.input`
  color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.3s background;

  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::before {
    content: "";
    color: black;
    display: inline-block;
    border-radius: 3px;
    padding: 15px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 4px;
    background-color: ${colors.primary};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    transition: 0.3s background;
  }

  :hover::before {
    background: #62bbcd;
  }

  :active {
    outline: 0;
  }

  :active::before {
    background: #62bbcd;
  }
`;
