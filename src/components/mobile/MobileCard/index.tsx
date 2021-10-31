import React from "react";
import { format } from "date-fns";
import { Service } from "../../../store/ducks/servicesSlice";

import * as S from "./styled";
import { BUCKET_URL } from "../../../utils";

type Props = {
  service: Service;
};

const MobileCard: React.FC<Props> = ({ service }) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Image
          src={`${BUCKET_URL}${service.files[0].folder}`}
          alt={service.title}
        />
        <S.Content>
          <h4>{service.title}</h4>
          <p>
            R$ {service.price.toFixed(2).split(".").join(",")} -{" "}
            {format(new Date(service.service_duration), "HH:mm")}h
          </p>
        </S.Content>
      </S.Container>
      <S.Button>Agendar</S.Button>
    </S.Wrapper>
  );
};

export default MobileCard;
