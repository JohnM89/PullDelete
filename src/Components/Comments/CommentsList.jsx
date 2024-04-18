import  { useState } from 'react';  // Import useState and other React features
import PropTypes from 'prop-types';
import styled from 'styled-components';


import expandIcon from '/src/assets/images/Arrow (down).ico';
import collapseIcon from '/src/assets/images/Arrow (up).ico';

const bigBlue = `
  color: white;
  padding: 8px;
  background-color: #174378;
  border: 1px solid #174378;
  border-radius: 3px;
`;

const smallGrey = `
  margin: 5px 0;
  padding: 5px 10px;
  background-color: #dfe7ec;
  border: 1px solid #c7d3df;
  border-radius: 3px;
  color: #545f69;
  position: relative;

  span {
    color: #041320;
  }
`;

const StyledTree = styled.ul`
  list-style: none;
  padding-left: 10px;

  .folder {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
    height: 30%;
    align-items: center;
    justify-content: center;

    &:not(:first-child) {
      margin-top: 2rem;
    }

    ${bigBlue}

    @media (min-width: 768px) {
      padding: 2rem;
    }

    @media (min-width: 1024px) {
      padding: 2rem;
    }
  }

  .file {
    margin-left: 20px;
    list-style-type: none;
    ${smallGrey}
  }

  .toggle-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
  }

  .hidden { display: none; }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + i + ul { display: none; }
  input[type="checkbox"]:checked + i + ul { display: block; }
`;

// const StyledTree = styled.ul`
//   list-style: none;
//   padding-left: 10px;
  
//   .folder {
//     cursor: pointer;
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     background-color: white;
//     padding: 2rem;
//     border-radius: 0.5rem;
//     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
//     height: 30%;
//     align-items: center;
//     justify-content: center;

//     &:not(:first-child) {
//       margin-top: 2rem;
//     }

//     @media (min-width: 768px) {
//       padding: 2rem;
//     }

//     @media (min-width: 1024px) {
//       padding: 2rem;
//     }
//   }

//   .file {
//     margin-left: 20px;
//     list-style-type: none;
//   }

//   .toggle-button {
//     background: none;
//     border: none;
//     cursor: pointer;
//     font-size: 1rem;
//     padding: 0;
//   }

//   .hidden { display: none; }

//   input[type="checkbox"] {
//     display: none;
//   }

//   input[type="checkbox"] + i + ul { display: none; }
//   input[type="checkbox"]:checked + i + ul { display: block; }
// `;

function buildCommentTree(comments) {
  const commentMap = {};
  comments.forEach(comment => {
    const stringParentId = String(comment.parent_id);
    commentMap[comment.id] = {...comment, children: [], parent_id: stringParentId};
  });
  const tree = [];
  comments.forEach(comment => {
    const parentId = comment.parent_id.slice(3);
    const parent = commentMap[parentId];
    if (parent) {
      parent.children.push(commentMap[comment.id]);
    } else {
      tree.push(commentMap[comment.id]);
    }
  });
  return tree;
}

const Comment = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <StyledTree>
      <li>
        <div className="folder">
          <button onClick={toggle} className="toggle-button">
            <img src={isOpen ? collapseIcon : expandIcon} alt={isOpen ? 'Collapse' : 'Expand'} />
          </button>
          <span>{`Comment by ${comment.author}`}</span>
          <ul className={isOpen ? '' : 'hidden'}>
            <li className="file">{comment.body}</li>
            {comment.children && comment.children.map(child => (
              <Comment key={child.id} comment={child} />
            ))}
          </ul>
        </div>
      </li>
    </StyledTree>
  );
};

function CommentsList({ comments }) {
  const commentTree = buildCommentTree(comments);
  const reversedCommentTree = [...commentTree].reverse();  // reversed copy of the array

  return (
    <StyledTree>
      {reversedCommentTree.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </StyledTree>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    parent_id: PropTypes.string.isRequired,
    link_id: PropTypes.string.isRequired,
  })).isRequired
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
    parent_id: PropTypes.string,
    link_id: PropTypes.string,
  }).isRequired
};

export default CommentsList;
