import { combineReducers } from "redux";
import _ from "lodash";

function posts(state = null, action) {
  let newState = state;

  switch (action.type) {
    case "INDEX":
      newState = newState || {};
      _.each(action.posts, post => {
        newState[post.id] = post;
      });
      break;
    case "SHOW":
      newState = newState || {};
      newState[action.post.id] = action.post;
      break;
    default:
      break;
  }

  return newState;
}

function error(state = null, action) {
  let newState = state;

  switch (action.type) {
    case "ERROR":
      newState = { status: action.status };
      break;
    default:
      newState = null;
      break;
  }

  return newState;
}

const blogReducer = combineReducers({ posts, error });

export default blogReducer;
