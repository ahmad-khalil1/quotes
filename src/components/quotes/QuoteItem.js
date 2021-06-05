import { Link, useRouteMatch } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = props => {
  const { path, url } = useRouteMatch();
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`${url}/${props.id}`} className='btn'>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
