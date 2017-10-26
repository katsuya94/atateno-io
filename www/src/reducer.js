import { combineReducers } from "redux";

function index(_state, action) {
  switch (action.type) {
    case "INDEX":
      return { data: action.data };
    case "ERROR":
      return { error: { status: action.status } };
    default:
      return null;
  }
}

function show(_state, action) {
  switch (action.type) {
    case "SHOW":
      return { data: action.data };
    case "ERROR":
      return { error: { status: action.status } };
    default:
      return null;
  }
}

const reducer = combineReducers({ index, show });

export default reducer;
