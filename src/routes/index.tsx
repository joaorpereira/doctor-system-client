import React, { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface IRoutes {
  component: React.ComponentType<React.FC>;
  isPrivate?: boolean;
  exact?: boolean;
  path: string | string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest?: any;
}

const Routes: React.FC<IRoutes> = ({
  component: Component,
  isPrivate,
  ...rest
}): ReactElement => {
  const { token } = useAppSelector(({ authReducers }) => authReducers);

  if (isPrivate && !token) {
    return <Redirect to={"/login"} />;
  }

  return <Route {...rest} component={Component} />;
};

export default Routes;
