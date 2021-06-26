import React, { ReactElement, useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { getCompanies } from "../../store/ducks/companiesSlice";

const HomePage: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return <div>Home Page</div>;
};

export default HomePage;
