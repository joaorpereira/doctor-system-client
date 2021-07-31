import styled from "styled-components";

type SectionProps = {
  wrap?: boolean;
  marginBottom?: string;
};

export const HoursSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const HeaderRow = styled.header`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  margin-bottom: 30px;
`;

export const Section = styled.section<SectionProps>`
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "10px"};
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: ${({ wrap }) => wrap && "wrap"};
`;
