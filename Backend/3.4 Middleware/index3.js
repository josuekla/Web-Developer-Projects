import express from "express";

const app = express();
const port = 3000;

function logger(req, res, next){
  console.log("Method Request: " + req.method);
  console.log("URL Request: " + req.url);
  console.log("ip Request: " + req.ip);
  next()
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello, you are goind to Google!");
  res.redirect("https://www.google.com")
});

app.get("/user", (req, res) => {
  res.send("User");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
