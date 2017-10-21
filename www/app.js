const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.listen(3000, () => {
  console.log("Running...");
});
