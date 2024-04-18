import  { useState } from 'react';  // Import useState and other React features
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { GroupBox, TreeView, Button, Window, WindowContent, WindowHeader } from 'react95';

// const Wrapper = styled.div`
//   padding: 5rem;
//   .window-title {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }
//   .close-icon {
//     display: inline-block;
//     width: 16px;
//     height: 16px;
//     margin-left: -1px;
//     margin-top: -1px;
//     transform: rotateZ(45deg);
//     position: relative;
//     &:before, &:after {
//       content: '';
//       position: absolute;
//       background: ${({ theme }) => theme.materialText};
//     }
//     &:before {
//       height: 100%;
//       width: 3px;
//       left: 50%;
//       transform: translateX(-50%);
//     }
//     &:after {
//       height: 3px;
//       width: 100%;
//       left: 0;
//       top: 50%;
//       transform: translateY(-50%);
//     }
//   }
// `;

// const Panel = styled.div`
//  padding: 2rem;
// `;

const StyledTree = styled.ul`
  list-style: none;
  padding-left: 20px;
  
  .folder {
    cursor: pointer;
    i { margin-right: 5px; }
  }
  .file {
    margin-left: 20px;
    list-style-type: none;
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
            {isOpen ? '-' : '+'}
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
