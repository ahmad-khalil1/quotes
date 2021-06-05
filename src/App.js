import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import NotFound from "./pages/NotFound";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={"/quotes/:quoteId"}>
          <QuoteDetail />
        </Route>
        <Route path={"/quotes"}>
          <AllQuotes />
        </Route>
        <Route path={"/new-quote"}>
          <NewQuote />
        </Route>
        <Route path={"/"} exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path={"*"} exact>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
