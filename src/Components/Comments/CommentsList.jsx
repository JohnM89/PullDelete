import PropTypes from 'prop-types';

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

//prop types for comments and map




export default CommentsList;
