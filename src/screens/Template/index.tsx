import React, {
  ReactElement,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, Navbar } from "../../components";

import Routes from "../../routes/routes";
import * as S from "./styled";

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
    <>
      {!["/login", "/cadastro"].includes(currentPath) ? (
        <S.Wrapper>
          <Sidebar handleRoute={handleRoute} currentPath={currentPath} />
          <Navbar />
          <S.Private>
            <Routes />
          </S.Private>
        </S.Wrapper>
      ) : (
        <S.Public>
          <Routes />
        </S.Public>
      )}
    </>
  );
};

export default Template;
