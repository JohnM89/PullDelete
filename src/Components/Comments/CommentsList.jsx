import React from 'react';

function CommentsList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.author}: {comment.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default CommentsList;
