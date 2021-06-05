import { useParams, Route, useRouteMatch, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/useHttp";
import { getSingleQuote } from "../api/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const QuoteDetail = () => {
  const { path, url, params } = useRouteMatch();
  const { sendRequest, status, data: loadedQuote, error } = useHttp(
    getSingleQuote,
    true
  );

  const quoteId = params.quoteId;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className='centered focused'>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found! </p>;
  }

  // const quote = DUMMY_QUOTES.find(quote => params.quoteId === quote.id);
  // if (!quote) {
  //   return <p>No quote found!</p>;
  // }
  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
