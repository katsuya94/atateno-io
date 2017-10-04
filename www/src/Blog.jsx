import React from 'react';
import _ from 'lodash';

const REF = 'drafts';
const INDEX_URL = _.template(
  'https://api.github.com/repos/katsuya94/blog/contents?ref=<%= ref %>',
)({ ref: REF });
const COMMITS_URL = path => _.template(
  'https://api.github.com/repos/katsuya94/blog/commits?path=<%= path %>&sha=<%= ref %>',
)({ ref: REF, path });


class Post {
  constructor(contents) {
    this.url = contents.download_url;
    this.path = contents.path;
  }

  populate() {
    const contentsPromise = fetch(this.url)
      .then(response => response.text())
      .then((content) => {
        this.content = content;
      });

    const commitsPromise = fetch(COMMITS_URL(this.path))
      .then(response => response.json())
      .then((commits) => {
        this.ref = _.first(commits).commit.sha;
        this.updated = _.first(commits).commit.author.date;
        this.created = _.last(commits).commit.author.date;
      });

    return Promise.all([contentsPromise, commitsPromise]);
  }
}

class Index extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    fetch(INDEX_URL)
      .then(response => response.json())
      .then((index) => {
        this.posts = _.map(index, contents => new Post(contents));

        _.each(this.posts, post => (
          post.populate().then(() => this.computeState())
        ));

        this.computeState();
      });
  }

  computeState() {
    const postsForState = _.map(this.posts, post => ({
      content: post.content,
      ref: post.ref,
      updated: post.updated,
      created: post.created,
    }));

    this.setState({ posts: postsForState });
  }

  render() {
    return (
      <div className="app-index">
        <ul>
          {
            _.map(this.state.posts, post => (
              <li>{JSON.stringify(post)}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default function Blog() {
  return (
    <div className="app-blog container">
      <Index />
    </div>
  );
}
