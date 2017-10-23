import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import BlogGateway, { Post } from "./BlogGateway";
import BlogIndex from "./BlogIndex";
import BlogShow from "./BlogShow";

function createConnected(fetchData, mapStateToProps) {
  return Component => {
    const FetchingComponent = class extends React.Component {
      componentDidMount() {
        fetchData(this.props).then(action => {
          this.props.dispatch(action);
        });
      }

      render() {
        return <Component {...this.props} />;
      }
    };

    FetchingComponent.propTypes = {
      dispatch: PropTypes.func.isRequired
    };

    return connect((state, ownProps) => ({
      error: state.error,
      ...mapStateToProps(state, ownProps)
    }))(FetchingComponent);
  };
}

const ConnectedBlogIndex = createConnected(
  () => BlogGateway.index(),
  state => {
    const postsState = state.posts;
    const posts =
      postsState && _.map(postsState, postState => new Post(postState));
    return { posts };
  }
)(BlogIndex);

const ConnectedBlogShow = createConnected(
  ({ match }) => BlogGateway.show(match.params.id),
  (state, { match }) => {
    const postState = state.posts && state.posts[match.params.id];
    const post = postState && new Post(postState);
    return { post };
  }
)(BlogShow);

export default function Blog({ match }) {
  return (
    <div className="app-blog container">
      <Switch>
        <Route exact path={match.url} component={ConnectedBlogIndex} />
        <Route path={`${match.url}/:id`} component={ConnectedBlogShow} />
      </Switch>
    </div>
  );
}

Blog.propTypes = {
  match: ReactRouterPropTypes.match.isRequired // eslint-disable-line react/no-typos
};
