import express from "express";
import axios from "axios";
import doenv from "dotenv";
doenv.config();

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";
const Username = process.env.YOUR_USERNAME;
const Password = process.env.YOUR_PASSWORD;

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "0c34574a-1011-497c-a1ab-3ac4070a2dbe";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // res.redirect("/");
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  const secretContent = req.body.secret;
  const scoreContent = req.body.score;
  try {
    const result = await axios.post(API_URL + "/secrets", {
      secret : secretContent,
      score : scoreContent
    }, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const secretContent = req.body.secret;
    const scoreContent = req.body.score;
    const url = API_URL + "/secrets/" + searchId;
    const response = await axios.put(
      url, 
      {
      secret : secretContent,
      score : scoreContent
      },
     config
    );
    res.render("index.ejs", { content : JSON.stringify(response.data)})
  }
  catch(error) {
    res.render("index.ejs", {content: JSON.stringify(error.response.data)} )
  };
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  
} )

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  const secretContent = req.body.secret;
  const scoreContent = req.body.score;
  const url = API_URL + "/secrets/" + searchId;
  try {
    const response = await axios.patch(
      url, 
      {
      secret : secretContent,
      score : scoreContent
      },
     config
    );

    res.render("index.ejs", { content : JSON.stringify(response.data)})
  }

  catch(error) {
    res.render("index.ejs", {content: JSON.stringify(error.response.data)} )
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  const url = API_URL + "/secrets/" + searchId;
  try {
    const result = await axios.delete(url, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch (error) { 
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


app.post("/get-secrets-by-page", async (req, res) => {
  const page = req.body.page;
  const url = API_URL + "/all?page=" + page;
  try {
    const result = await axios.get(url, {
      auth: {
        username: Username,
        password: Password,
      }
    });

    res.render("index.ejs", { content: JSON.stringify(result.data) });
  }
  catch (error) { 
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
