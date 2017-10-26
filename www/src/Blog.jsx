import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import BlogGateway, { Post } from "./BlogGateway";
import BlogIndex from "./BlogIndex";
import BlogShow from "./BlogShow";

function connectedContainer({ shouldFetchData, fetchData, mapStateToProps }) {
  return Component => {
    class Container extends React.Component {
      componentDidMount() {
        if (shouldFetchData(this.props.childProps)) {
          fetchData(this.props.childProps).then(action => {
            this.props.dispatch(action);
          });
        }
      }

      render() {
        return <Component {...this.props.childProps} />;
      }
    }

    Container.propTypes = {
      dispatch: PropTypes.func.isRequired,
      childProps: PropTypes.object.isRequired
    };

    return connect(() => ({
      childProps: mapStateToProps(...arguments)
    }))(Container);
  };
}

const ConnectedBlogIndex = createConnected({
  shouldFetchData(props) {
    return !props.posts;
  },

  fetchData(_props) {
    return BlogGateway.index();
  },

  mapStateToProps(state) {
    const posts = postsState && _.map(state.posts, post => new Post(post));
    return { posts };
  }
})(BlogIndex);

const ConnectedBlogShow = createConnected({
  shouldFetchData(props) {
    return !props.post || props.post.id !== props.id;
  },

  fetchData(props) {
    return BlogGateway.show();
  },

  mapStateToProps(state) {
    const post = state.post && new Post(state.post);
    return { post };
  }
})(BlogShow);

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
