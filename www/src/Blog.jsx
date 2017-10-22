import React from "react";
import { Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import _ from "lodash";

import BlogGateway from "./BlogGateway";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = { posts: props.data.posts };
  }

  componentDidMount() {
    if (!this.props.data.isServerRendered) {
      BlogGateway.index().then(data => {
        this.setState(data);
      });
    }
  }

  render() {
    return (
      <div className="app-index">
        <ul>
          {_.map(this.state.posts, post => (
            <li key={post.id}>{JSON.stringify(post)}</li>
          ))}
        </ul>
      </div>
    );
  }
}

Index.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.array.isRequired,
    isServerRendered: PropTypes.bool.isRequired
  })
};

Index.defaultProps = {
  data: { posts: [], isServerRendered: false }
};

export default function Blog() {
  return (
    <div className="app-blog container">
      <Route
        render={({ staticContext }) =>
          staticContext ? <Index data={staticContext.data} /> : <Index />}
      />
    </div>
  );
}
