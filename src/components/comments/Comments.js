// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import classes from "./Comments.module.css";
// import NewCommentForm from "./NewCommentForm";
// import { getAllComments } from "../../api/api";
// import useHttp from "../../hooks/useHttp";
// import LoadingSpinner from "../UI/LoadingSpinner";
// import CommenstList from "./CommentsList";
// const Comments = () => {
//   const { sendRequest, data: loadedComments, status, error } = useHttp(
//     getAllComments
//   );
//   const [isAddingComment, setIsAddingComment] = useState(false);
//   const params = useParams();
//   const startAddCommentHandler = () => {
//     setIsAddingComment(true);
//   };

//   const { quoteId } = params;
//   const addedCommentsHandler = _ => {};
//   useEffect(() => {
//     sendRequest(quoteId);
//   }, [quoteId, sendRequest]);

//   let comments;
//   if (status === "pending") {
//     comments = (
//       <div className='centered'>
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (error) {
//     return <p className='centered focused'>{error}</p>;
//   }

//   if (status === "completed" && loadedComments && loadedComments.length > 0) {
//     comments = <CommenstList comments={loadedComments} />;
//   }

//   if (
//     status === "completed" &&
//     (!loadedComments || loadedComments.length === 0)
//   ) {
//     comments = <p className='centered'> No comments Added yet .. </p>;
//   }
//   return (
//     <section className={classes.comments}>
//       <h2>User Comments</h2>
//       {!isAddingComment && (
//         <button className='btn' onClick={startAddCommentHandler}>
//           Add a Comment
//         </button>
//       )}
//       {isAddingComment && (
//         <NewCommentForm
//           quoteId={params.quoteId}
//           onAddedComments={addedCommentsHandler}
//         />
//       )}
//       {comments}
//     </section>
//   );
// };

// export default Comments;

import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/useHttp";
import { getAllComments } from "../../api/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className='centered'>No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
