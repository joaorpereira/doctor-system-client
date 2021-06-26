import React, { ReactElement, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import Route from "./index";

const Home = lazy(() => import("../screens/Home"));

const Routes: React.FC = (): ReactElement => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
