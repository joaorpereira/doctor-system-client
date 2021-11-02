import React from "react";
import * as S from "./styled";

export type IconListProps = {
  label: string;
  icon: React.ReactElement;
};

type Props = {
  handleActions: (action: string) => void;
  action: string;
};

const iconsList: IconListProps[] = [
  { label: "Ligar", icon: <S.ShareIcon /> },
  { label: "Visitar", icon: <S.LocationIcon /> },
  { label: "Compartilhar", icon: <S.CallIcon /> },
];

const ServicesActions: React.FC<Props> = ({ handleActions, action }) => {
  return (
    <S.Wrapper>
      <S.ActionsWrapper>
        {iconsList.map((item) => (
          <S.IconButton
            key={item.label}
            onClick={() => handleActions(item.label)}
            isSelected={action === item.label}
          >
            {item.icon} <p>{item.label}</p>
          </S.IconButton>
        ))}
      </S.ActionsWrapper>
      <S.ScheduleLaterContainer>
        <S.Button>Agendar Depois</S.Button>
        <p>Horários Diponíveis</p>
      </S.ScheduleLaterContainer>
    </S.Wrapper>
  );
};

export default ServicesActions;
