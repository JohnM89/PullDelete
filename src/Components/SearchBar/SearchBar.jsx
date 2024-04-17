import { useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ onSubmit }) {
  const [url, setUrl] = useState('');

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={url} onChange={handleChange} placeholder="Paste Reddit URL here" />
      <button type="submit">Fetch Comments</button>
    </form>
  );
}

//props for onSubmit

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };
    
export default SearchBar;
