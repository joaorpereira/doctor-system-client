import React, {
  ReactElement,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Sidebar, Navbar, Logout } from "../../components";
import { useAppSelector } from "../../hooks";

import Routes from "../../routes/routes";
import { requestLogout } from "../../store/ducks/authSlice";
import * as S from "./styled";

const Template: React.FC = (): ReactElement => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useAppSelector(({ authReducers }) => authReducers);

  const [currentPath, setCurrentPath] = useState("/agendamentos");
  const [configurationPage, setConfigurationPage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    if (location) setCurrentPath(location?.pathname);
  }, [location]);

  const handleRoute = useCallback((route: string) => {
    setCurrentPath(route);
  }, []);

  const handleLogout = () => {
    console.log("aqui");
    dispatch(requestLogout(history));
  };

  const handleConfiguration = useCallback(() => setConfigurationPage(true), []);
  const handleShowLogoutModal = () => setShowModal(!showModal);

  return (
    <>
      {!["/login", "/cadastro"].includes(currentPath) ? (
        <S.Wrapper>
          <Sidebar handleRoute={handleRoute} currentPath={currentPath} />
          <Navbar user={user} handleShowLogoutModal={handleShowLogoutModal} />
          <Logout
            setShowModal={setShowModal}
            showModal={showModal}
            handleConfiguration={handleConfiguration}
            handleLogout={handleLogout}
          />
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
