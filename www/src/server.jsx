import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import reload from "reload";

import console from "console";
import fs from "fs";
import path from "path";
import process from "process";

import _ from "lodash";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "./App";
import BlogGateway from "./BlogGateway";

const app = express();
const ROOT = process.cwd();

let html = fs.readFileSync(path.resolve(ROOT, "src", "index.html"), "utf8");

app.use(morgan("combined"));
app.use(helmet());
app.use("/assets", express.static(path.resolve(ROOT, "public")));

app.use((_req, res, next) => {
  res.locals.context = { isServerRendered: true };
  next();
});

function render(req, res) {
  const rendered = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={res.locals.context}>
      <App />
    </StaticRouter>
  );
  const body = html.replace(
    /<div id="app"><\/div>/,
    `<div id="app">${_.trim(rendered)}</div>`
  );
  res.status(200).send(body);
}

app.get(
  "/blog",
  (req, res, next) => {
    BlogGateway.index().then(data => {
      res.locals.context.data = data;
      next();
    });
  },
  render
);

app.get(
  "/blog/:id",
  (req, res, next) => {
    BlogGateway.show(req.params.id).then(data => {
      res.locals.context.data = data;
      next();
    });
  },
  render
);

app.get("/", render);

if (app.get("env") === "development") {
  reload(app);
  html = html.replace(
    /<script/,
    '<script src="/reload/reload.js"></script><script'
  );
}

app.listen(3000, () => {
  console.log("atateno-io/www running on port 3000");
});
