if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

server.listen(port, () => {
  console.log("app listening to address http://localhost:" + port);
});

app.get("/", (req, res) => {
  res.render("home");
});
