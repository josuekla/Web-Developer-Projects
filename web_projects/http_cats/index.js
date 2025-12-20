import axios from "axios"
import express from "express"

const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
  const imageUrl = req.query.statuscode ? `https://httpcats.com/${req.query.statuscode}.jpg` : null;
  
  res.render("index.ejs", { imageUrl});
} )

app.post("/", (req, res) => {
  const statuscode = req.body.statuscode
  
  res.redirect(`/?statuscode=${statuscode}`);
});

app.listen(port, () => {
  console.log(`Aplicação rodando em http://localhost:${port}`);
});