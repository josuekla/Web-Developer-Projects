import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

let quiz = [];
const db = new pg.Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
})

db.connect()

async function load_quiz_data() {
  try {
    const res = await db.query('SELECT * FROM flags');
    quiz = res.rows;
  } catch (err) {
    console.error("Error loading quiz data: ", err.stack);
  }
}




const app = express();
const port = 3000;

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  await load_quiz_data();

  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  console.log("Received answer: ", answer);
  let isCorrect = false;
  console.log(answer);
  console.log(currentQuestion);
  if (answer && currentQuestion.name) {
    console.log("Comparing: ", answer.toLowerCase(), " with ", currentQuestion.name.toLowerCase());
  }
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
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

function nextQuestion() {
  if (quiz.length === 0) {
    console.log("Quiz vazio");
    return;
  }

  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
