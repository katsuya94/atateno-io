import React from "react";
import PropTypes from "prop-types";

import { Post } from "./BlogGateway";

export default function BlogShow({ error, post }) {
  if (error) {
    return <div className="content">Error {error.status}</div>;
  }

  if (!post) {
    return <div className="content">Loading&hellip;</div>;
  }

  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  );
}

BlogShow.propTypes = {
  error: PropTypes.shape({ status: PropTypes.number }),
  post: PropTypes.instanceOf(Post)
};

BlogShow.defaultProps = {
  error: null,
  post: null
};
