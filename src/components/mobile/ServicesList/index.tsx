import { Service } from "../../../store/ducks/servicesSlice";
import MobileCard from "../MobileCard";
import * as S from "./styled";

type Props = {
  services: Service[];
};

const ServicesList: React.FC<Props> = ({ services }) => {
  return (
    <S.Wrapper>
      <S.Title>Serviços ({services.length})</S.Title>
      <S.Container>
        {services.map((service) => (
          <MobileCard key={service._id} service={service} />
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

export default ServicesList;
