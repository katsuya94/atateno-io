import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import blogReducer from "./blogReducer";

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;
console.log(preloadedState);

const store = createStore(blogReducer, preloadedState);
const root = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  root
);

store.subscribe(() => {
  console.log(store.getState());
});
