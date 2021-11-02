import React, { ReactElement, lazy, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { Switch } from "react-router-dom";
import Route from "./index";

// desktop
const Schedule = lazy(() => import("../screens/Schedule"));
const Clients = lazy(() => import("../screens/Clients"));
const Workers = lazy(() => import("../screens/Workers"));
const Services = lazy(() => import("../screens/Services"));
const Hours = lazy(() => import("../screens/Hours"));
const LoginPage = lazy(() => import("../screens/Login"));
const SignUp = lazy(() => import("../screens/Signup"));

// mobile
const Home = lazy(() => import("../screens/Home"));
const Medics = lazy(() => import("../screens/Medics"));

const Routes: React.FC = (): ReactElement => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/cadastro" exact component={SignUp} />
        <Route
          path={isMobile ? ["/", "/home"] : ["/", "/agendamentos"]}
          exact
          component={isMobile ? Home : Schedule}
          isPrivate
        />
        <Route path="/clientes" exact component={Clients} isPrivate />
        <Route
          path="/colaboradores"
          exact
          component={isMobile ? Medics : Workers}
          isPrivate
        />
        <Route path="/servicos" exact component={Services} isPrivate />
        <Route path="/horarios" exact component={Hours} isPrivate />
      </Switch>
    </Suspense>
  );
};

export default Routes;
