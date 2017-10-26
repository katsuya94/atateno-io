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
      childProps: () => {}
    };

    return connect((...args) => ({
      childProps: mapStateToProps(...args)
    }))(Container);
  };
}

const ConnectedBlogIndex = connectedContainer({
  shouldFetchData(props) {
    return !props.posts;
  },

  fetchData() {
    return BlogGateway.index();
  },

  mapStateToProps(state) {
    const { error } = state.index;
    const posts =
      state.index.data && _.map(state.index.data, datum => new Post(datum));
    return { error, posts };
  }
})(BlogIndex);

const ConnectedBlogShow = connectedContainer({
  shouldFetchData(props) {
    return !props.post;
  },

  fetchData() {
    return BlogGateway.show();
  },

  mapStateToProps(state, { match }) {
    const { error } = state.show;
    const post = state.show.data && new Post(state.show.data);
    return { error, post: post.id === match.params.id && post };
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
