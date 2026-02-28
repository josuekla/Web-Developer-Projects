import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // const data = {
  //   name,
  //   lastName
  // }
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  {
    const name = req.body.fName;
    const lastName = req.body.lName;
    res.render("index.ejs", { name, lastName });
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
