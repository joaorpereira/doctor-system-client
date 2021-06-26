import React, {
  ReactElement,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import Routes from "../../routes/routes";

import * as S from "./styled";
import { useLocation } from "react-router-dom";

const Template: React.FC = (): ReactElement => {
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState("/agendamentos");

  const handleRoute = useCallback((route: string) => {
    setCurrentPath(route);
  }, []);

  useLayoutEffect(() => {
    if (location) setCurrentPath(location.pathname);
  }, [location]);

  return (
    <S.Wrapper>
      <Sidebar handleRoute={handleRoute} currentPath={currentPath} />
      <Navbar />
      <S.Main>
        <Routes />
      </S.Main>
    </S.Wrapper>
  );
};

export default Template;
