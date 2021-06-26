import React, { ReactElement, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import Route from "./index";

const Home = lazy(() => import("../screens/Home"));
const Clients = lazy(() => import("../screens/Clients"));
const Workers = lazy(() => import("../screens/Workers"));
const Services = lazy(() => import("../screens/Services"));
const Hours = lazy(() => import("../screens/Hours"));

const Routes: React.FC = (): ReactElement => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={["/", "/agendamentos"]} exact component={Home} />
        <Route path="/clientes" exact component={Clients} />
        <Route path="/colaboradores" exact component={Workers} />
        <Route path="/servicos" exact component={Services} />
        <Route path="/horarios" exact component={Hours} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
