import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

import { Post } from "./BlogGateway";

export default function BlogIndex({ match, error, posts }) {
  if (error) {
    return <div className="content">Error {error.status}</div>;
  }

  if (!posts) {
    return <div className="content">Loading&hellip;</div>;
  }

  return (
    <div className="app-index">
      <ul>
        {_.map(posts, post => (
          <li key={post.id}>
            <Link to={`${match.url}/${post.id}`}>{post.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

BlogIndex.propTypes = {
  match: ReactRouterPropTypes.match.isRequired, // eslint-disable-line react/no-typos
  error: PropTypes.shape({ status: PropTypes.number }),
  posts: PropTypes.arrayOf(PropTypes.instanceOf(Post))
};

BlogIndex.defaultProps = {
  error: null,
  posts: null
};
