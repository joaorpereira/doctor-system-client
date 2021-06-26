import React, { ReactElement, useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { getCompanies } from "../../store/ducks/companiesSlice";

const HomePage: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <div>
      <h1>Agendamentos</h1>
    </div>
  );
};

export default HomePage;
