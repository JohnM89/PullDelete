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
CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  })).isRequired
};



export default CommentsList;
