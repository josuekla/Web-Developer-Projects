import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello, You're in Root</h1>")
})

app.get("/europe", (req, res) => {
    res.send("<h1>Welcome! , You're in Europe!</h1>")
})
app.get("/europe/portugal", (req, res) => {
    res.send("<h1>Welcome! , You're in Portugal!</h1>")
})

app.listen(port, () => {
  console.log(`Server: ${port}`);
});
