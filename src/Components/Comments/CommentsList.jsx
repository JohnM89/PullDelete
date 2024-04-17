import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GroupBox, Button, Window, WindowContent, WindowHeader } from 'react95';



const Wrapper = styled.div`
  padding: 5rem;
  // background: ${({ theme }) => theme.desktopBackground};

  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;

    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }

    &:before {
    height: 100%;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
    }

    &:after {
      height: 3px;
     width: 100%;
     left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  #cutout {
    padding: 1rem;
    width: 400px;
    background: ${({ theme }) => theme.canvas};
  }
`;

// Function to construct a nested comment structure from a flat comment list.
function buildCommentTree(comments) {
  const commentMap = {};

  // First, map all comments by their ID to facilitate easy lookup and to add a children array.
  comments.forEach(comment => {
    commentMap[comment.id] = {...comment, children: []};
  });

  // Assemble the comment tree, determining parent-child relationships.
  const tree = [];
  comments.forEach(comment => {
    if (comment.parent_id === comment.link_id) {
      // If the comment is a top-level comment.
      tree.push(commentMap[comment.id]);
    } else {
      // Otherwise, it's a child comment.
      const parent = commentMap[comment.parent_id.slice(3)]; // Removes the 'ti_' prefix from parent_id.
      if (parent) {
        parent.children.push(commentMap[comment.id]); // Adds this comment as a child of the found parent.
      }
    }
  });

  return tree; // Returns the structured comment tree.
}

// Recursive component for rendering comments.
const Comment = ({ comment }) => {
  return (

    <Window key={comment.id}>
      <WindowHeader>
        <span>Comment by {comment.author}</span> 
        <Button>
          <span className="close-icon" /> 
        </Button>
      </WindowHeader>
      <WindowContent> 
        <GroupBox> 
          <p>{comment.body}</p> 
          
          {comment.children && comment.children.length > 0 && (
            // Styles child comments with indentation.
            <div style={{ marginLeft: '20px' }}>
              {comment.children.map(child => (
                <Comment key={child.id} comment={child} />
              ))}
            </div>
          )}
        </GroupBox>
      </WindowContent>
    </Window>
  );
};

// Main component that handles rendering the structured list of comments.
function CommentsList({ comments }) {
  const commentTree = buildCommentTree(comments); // Builds the hierarchical comment structure.

  return (
    <Wrapper> 
      {commentTree.map(comment => (
        <Comment key={comment.id} comment={comment} /> // Maps each top-level comment to the Comment component.
      ))}
    </Wrapper>
  );
}

// Define propTypes for each component to ensure proper types of props are passed, which helps in debugging and development.
CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({ // Ensures that comments is an array of objects with specific properties.
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    parent_id: PropTypes.string.isRequired,
    link_id: PropTypes.string.isRequired
  })).isRequired
};

Comment.propTypes = {
  comment: PropTypes.shape({ // Defines the shape of each comment object.
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object), // Validates that children is an array of objects.
    parent_id: PropTypes.string,
    link_id: PropTypes.string
  }).isRequired
};


export default CommentsList;
