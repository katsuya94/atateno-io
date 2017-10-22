import _ from "lodash";
import "isomorphic-fetch";

const REF = "drafts";
const INDEX_URL = `https://api.github.com/repos/katsuya94/blog/contents?ref=${REF}`;
const COMMITS_URL = path =>
  `https://api.github.com/repos/katsuya94/blog/commits?path=${path}&sha=${REF}`;

class Post {
  static fetchIndex() {
    return fetch(INDEX_URL)
      .then(response => response.json())
      .then(files =>
        _.map(files, file => {
          const post = new Post();
          post.url = file.download_url;
          post.path = file.path;
          return post;
        })
      );
  }

  fetchContent() {
    if (!this.url) {
      return Promise.reject();
    }

    return fetch(this.url)
      .then(response => response.text())
      .then(content => {
        this.content = content;
        return this;
      });
  }

  fetchCommits() {
    if (!this.path) {
      return Promise.reject();
    }

    return fetch(COMMITS_URL(this.path))
      .then(response => response.json())
      .then(commits => {
        this.ref = _.first(commits).commit.sha;
        this.updated = _.first(commits).commit.author.date;
        this.created = _.last(commits).commit.author.date;
        return this;
      });
  }

  id() {
    return _.trim(".md", this.path);
  }
}

export default class BlogGateway {
  static index() {
    return Post.fetchIndex().then(posts =>
      Promise.all(
        _.concat(
          _.map(posts, post => post.fetchContent()),
          _.map(posts, post => post.fetchCommits())
        )
      ).then(() => ({ posts }))
    );
  }
}
