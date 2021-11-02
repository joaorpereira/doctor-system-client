import styled from "styled-components";
import { colors } from "../../../styles";

export const Wrapper = styled.div`
  position: relative;
`;

export const ImageBackground = styled.div`
  :after {
    content: "";
    background: rgba(0, 0, 0, 0.55);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    height: 250px;
  }
`;

export const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 30px;
  z-index: 2;
`;

export const Image = styled.img`
  height: 250px;
  max-width: 100vw;
  object-fit: cover;
`;

export const Status = styled.span`
  background-color: ${colors.lightGreen};
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
`;

export const Content = styled.div`
  margin-top: 15px;
  color: ${colors.white};

  > h2 {
    margin-bottom: 2px;
    font-size: 24px;
  }

  > p {
    opacity: 0.8;
    font-size: 16px;
  }
`;
