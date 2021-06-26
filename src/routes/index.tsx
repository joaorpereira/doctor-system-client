import React, { ReactElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

interface IRoutes {
  component: React.ComponentType<React.FC>;
  isPrivate?: boolean;
  exact?: boolean;
  path: string | string[];
  rest?: any;
}

const Routes: React.FC<IRoutes> = ({
  component: Component,
  isPrivate,
  ...rest
}): ReactElement => {
  const isLoggedIn = useSelector((state) => state);

  if (isPrivate && !isLoggedIn) {
    return <Redirect to={"/login"} />;
  }

  return <Route {...rest} component={Component} />;
};

export default Routes;
