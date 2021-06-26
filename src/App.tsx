import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Template from "./screens/Template";
import { store } from "./store";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyles />
        <Template />
      </Router>
    </Provider>
  );
}

export default App;
