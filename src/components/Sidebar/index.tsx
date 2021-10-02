import { ReactElement } from "react";
import * as S from "./styled";
import {
  MdPeople,
  MdUpdate,
  MdEventAvailable,
  MdLibraryBooks,
} from "react-icons/md";

import workers from "../../assets/workers.png";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";

const routes = [
  {
    path: "/agendamentos",
    label: "Agendamentos",
    icon: <MdEventAvailable size={22} />,
  },
  { path: "/clientes", label: "Clientes", icon: <MdPeople size={22} /> },
  {
    path: "/colaboradores",
    label: "Colaboradores",
    icon: <img src={workers} alt={workers} style={{ width: "21px" }} />,
  },
  { path: "/servicos", label: "Serviços", icon: <MdLibraryBooks size={21} /> },
  { path: "/horarios", label: "Horários", icon: <MdUpdate size={22} /> },
];

const selectedStyle = {
  backgroundColor: "#03123490",
  color: "#fff",
  borderRight: "6px solid #ececec",
  width: "230px",
  boxShadow: "box-shadow: rgba(149, 157, 165, 1) 0px 8px 24px",
};

type ISidebarProps = {
  handleRoute: (route: string) => void;
  currentPath: string;
};
const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;

const Sidebar = ({ handleRoute, currentPath }: ISidebarProps): ReactElement => {
  const { user } = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  return (
    <S.Aside>
      {user?.picture ? (
        <img src={`${BUCKET_URL}${user.background}`} alt={user.name} />
      ) : (
        <S.Logo>
          <h1>{user.name}</h1>
        </S.Logo>
      )}
      <S.UserNameWrapper>
        <h4>{user.name}</h4>
      </S.UserNameWrapper>
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

export default Sidebar;
