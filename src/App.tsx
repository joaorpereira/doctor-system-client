import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Template from "./screens/Template";
import { store, persistor } from "./store";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <GlobalStyles />
          <Template />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
