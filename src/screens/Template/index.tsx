import React, {
  ReactElement,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Sidebar, Navbar, Logout, MobileNavbar } from "../../components";
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
  const [, setConfigurationPage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    if (location) setCurrentPath(location?.pathname);
  }, [location]);

  const handleRoute = useCallback((route: string) => {
    setCurrentPath(route);
  }, []);

  const handleLogout = () => {
    dispatch(requestLogout());
    history.push("/login");
  };

  const handleConfiguration = useCallback(() => setConfigurationPage(true), []);
  const handleShowLogoutModal = () => setShowModal(!showModal);

  const renderWithSidebar = () => (
    <>
      <Sidebar handleRoute={handleRoute} currentPath={currentPath} />
      <Navbar user={user} handleShowLogoutModal={handleShowLogoutModal} />
      <Logout
        setShowModal={setShowModal}
        showModal={showModal}
        handleConfiguration={handleConfiguration}
        handleLogout={handleLogout}
      />
    </>
  );

  return (
    <>
      {!["/login", "/cadastro"].includes(currentPath) ? (
        <S.Wrapper>
          {!isMobile && renderWithSidebar()}
          <S.Private>
            <Routes />
            {isMobile && <MobileNavbar />}
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
