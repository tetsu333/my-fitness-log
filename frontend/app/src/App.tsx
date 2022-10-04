import { HashRouter } from "react-router-dom";

import { Router } from "./router/Router";

const App = () => {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
};

export default App;
