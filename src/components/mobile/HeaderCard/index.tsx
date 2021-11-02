import React from "react";
import {
  CallCard,
  LocationCard,
  ServicesActions,
  ServicesHeader,
} from "../../../components";
import { Company } from "../../../store/ducks/companiesSlice";

type Props = {
  action: string;
  company: Company;
  distance: number;
  handleActions: (action: string) => void;
};

const HeaderCard: React.FC<Props> = ({
  action,
  company,
  distance,
  handleActions,
}) => {
  return (
    <>
      <ServicesHeader company={company} distance={distance} />
      <ServicesActions handleActions={handleActions} action={action} />
      {action === "Ligar" && <CallCard company={company} />}
      {action === "Visitar" && <LocationCard company={company} />}
    </>
  );
};

export default HeaderCard;
