import { useState, useLayoutEffect } from "react";
import * as S from "./styled";
import {
  MdPeople,
  MdUpdate,
  MdEventAvailable,
  MdLibraryBooks,
  MdViewList,
} from "react-icons/md";

import { useLocation } from "react-router-dom";

const routes = [
  {
    path: "/agendamentos",
    label: "Agendamentos",
    icon: <MdEventAvailable size={26} />,
  },
  { path: "/clientes", label: "Clientes", icon: <MdPeople size={26} /> },
  {
    path: "/colaboradores",
    label: "Colaboradores",
    icon: <MdViewList size={26} />,
  },
  { path: "/servicos", label: "Serviços", icon: <MdLibraryBooks size={26} /> },
  { path: "/horarios", label: "Horários", icon: <MdUpdate size={26} /> },
];

const selectedStyle = {
  backgroundColor: "#03123490",
  color: "#fff",
  borderRight: "6px solid #fff",
  width: "230px",
  boxShadow: "box-shadow: rgba(149, 157, 165, 1) 0px 8px 24px",
};

export const Sidebar = () => {
  const location = useLocation();

  const [currentPath, setCurrentPath] = useState("/agendamentos");

  const handleRoute = (route: string) => {
    setCurrentPath(route);
  };

  useLayoutEffect(() => {
    if (location) setCurrentPath(location.pathname);
  }, [location]);

  return (
    <S.Aside>
      <div>Logo</div>
      <S.List>
        {routes.map((route) => (
          <S.ListItem
            key={route.label}
            onClick={() => handleRoute(route.path)}
            style={currentPath === route.path ? selectedStyle : {}}
          >
            {route.icon}
            <S.StyledLink to={`${route.path}`}>{route.label}</S.StyledLink>
          </S.ListItem>
        ))}
      </S.List>
    </S.Aside>
  );
};
