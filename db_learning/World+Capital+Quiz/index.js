import express from "express";
import bodyParser from "body-parser";
import fs from 'fs';
import csv from 'csv-parser';


const app = express();
const port = 3000;
const quiz = [];

async function loadQuizData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('capitals.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

loadQuizData().then(data => {
  data.forEach(item => {
    quiz.push({ country: item.pais, capital: item.capital });
  });
}).catch(err => {
  console.error("Error loading quiz data:", err);
});

// let quiz = [
//   { country: "France", capital: "Paris" },
//   { country: "United Kingdom", capital: "London" },
//   { country: "United States of America", capital: "New York" },
// ];



let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  console.log("QUIZ:", quiz);
  totalCorrect = 0;
  await nextQuestion();
  // console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
