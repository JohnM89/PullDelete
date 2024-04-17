import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CommentsList from '../Comments/CommentsList';
import PropTypes from 'prop-types';

function Landing() {
  const [comments, setComments] = useState([]);

  const fetchComments = async (url) => {
    const match = url.match(/comments\/(\w+)\//);
    if (match) {
      const postId = match[1];
      const response = await fetch(`https://api.pullpush.io/reddit/search/comment/?link_id=${postId}`);
      const data = await response.json();
      setComments(data.data);
    } else {
      alert('Invalid Reddit URL');
    }
  };

  return (
    <div>
      <h1>Paste URL here</h1>
      <SearchBar onSubmit={fetchComments} />
      <CommentsList comments={comments} />
    </div>
  );
}

Landing.propTypes = {
  postId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Landing;