import styled from "styled-components";
import { colors } from "../../../styles";

type ParagraphProps = {
  marginTop?: string;
};

export const Card = styled.div`
  padding: 20px;
  background-color: ${colors.white};
  border-radius: 4px;
  margin: 15px;
`;

export const Paragraph = styled.p<ParagraphProps>`
  line-height: 35px;
  margin-top: ${({ marginTop }) => marginTop || 0};
`;
