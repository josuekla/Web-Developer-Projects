// HINTS:
// 1. Import express and axios
import axios from "axios";
import express from "express"

// 2. Create an express app and set the port number.
const app = express()
const port = 3000
app.use(express.urlencoded( { extended : true } ))
// 3. Use the public folder for static files.
app.use(express.static("public"))

// 4. When the user goes to the home page it should render the index.ejs file.

app.get("/", async (req, res) => {
  try {
    const resume = await axios.get("https://secrets-api.appbrewery.com/random");
    const data = resume.data;
    console.log(data.id);
    res.render("index.ejs", { secret : data.secret, user : data.username });
  }
  catch(error){
    // console.log(error.response.data)
  res.render("index.ejs", { 
    secret: null, 
    user: null 
  });
  }
})

// Code for show the specific secret by id, used only for test purposes
// app.get("/", async (req, res) => {
//   const config = {
//   headers: { Authorization: "Bearer 0c34574a-1011-497c-a1ab-3ac4070a2dbe" },};
//   const searchId = 52;
//   try {
//     const result = await axios.get("https://secrets-api.appbrewery.com" + "/secrets/" + searchId, config);
//     const data = result.data;
//     res.render("index.ejs", { secret : data.secret, user : data.username });
//   } catch (error) {
//     res.render("index.ejs", { content: error.response.data });
//   }
// });


// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.


app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);});