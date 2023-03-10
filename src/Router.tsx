import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/">
          <Coin />
        </Route>
        <Route path="/:coinId">
          <Coins />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default Router;
