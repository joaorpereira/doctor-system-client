import React from "react";
import * as S from "./styled";

import Share from "../../../assets/share.svg";
import Location from "../../../assets/location.svg";
import Call from "../../../assets/call.svg";

const iconsList = [
  { label: "Ligar", link: "/", icon: Call },
  { label: "Visitar", link: "/", icon: Location },
  { label: "Compartilhar", link: "/", icon: Share },
];

const ServicesActions = () => {
  return (
    <S.Wrapper>
      <S.ActionsWrapper>
        {iconsList.map((item) => (
          <S.IconButton key={item.label}>
            <img src={item.icon} alt={item.label} /> <p>{item.label}</p>
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
