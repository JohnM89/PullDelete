import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CommentsList from '../Comments/CommentsList';

function Landing() {
  const [comments, setComments] = useState([]);

  const fetchComments = async (url) => {
    const response = await fetch(`https://api.pullpush.io/reddit/search/comment/?link_id=${postId}`);

    const data = await response.json();
    setComments(data);
  };

  return (
    <div>
      <h1>Reddit Comment Fetcher</h1>
      <SearchBar onSubmit={fetchComments} />
      <CommentsList comments={comments} />
    </div>
  );
}