import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function getAtivity(type = null, participants = null) {
  // Random selection for api https://apis.scrimba.com/bored/api/activity
  const types = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];
  const participantsList = [1, 2, 3, 4, 5, 6 ,7, 8];
  // const types = ["education", "charity", "recreational", "relaxation", "busywork", "social", "diy", "music"]
  // const participantsList = [1, 2, 3, 4];
  const randomType = type || types[Math.floor(Math.random() * types.length)];
  const randomParticipants = participants || participantsList[Math.floor(Math.random() * participantsList.length)];

  return { type: randomType, participants: randomParticipants };
}

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  const type = req.query.type || null;
  const participants = req.query.participants || null;
  const params = getAtivity(type, participants);

  try { 
    const activity = await axios.get("https://apis.scrimba.com/bored/api/activity", {
      params: params
    });
    // const activity = await axios.get("https://bored-api.appbrewery.com/filter", {
    //   params: getAtivity()
    // });
    console.log(params);
    // const resume = activity.data[Math.floor(Math.random() * activity.data.length)];
    const resume = activity.data;
    console.log(resume);
    res.render("index.ejs", { data: resume });
  }
  catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", (req, res) => {
  const type = req.body.type;
  const participants = req.body.participants;
  res.redirect(`?type=${type}&participants=${participants}`);
  // res.redirect(`/?type=${type}&participants=${participants}`);
}
);

// app.post("/", async (req, res) => {
//   // console.log(req.body);
//   const type = req.body.type;
//   const participants = req.body.participants;
//   console.log(`Type: ${type}, Participants: ${participants}`);
//   try {
//     const response = await axios.get("https://bored-api.appbrewery.com/filter", 
//       {
//         params: {
//           type: type,
//           participants: participants
//         }
//       }
//     );

//     console.log(response.data[0]);
//   }
//   catch (error) {
//     console.error("Failed to make request:", error.message);
//     res.render("index.ejs", {
//       error: error.message,
//     });
//   }
//   res.redirect(`/?type=${type}&participants=${participants}`);
//   // try {
//   //   response = await axios.get("https://bored-api.appbrewery.com/random", {
//   //     params : {
//   //       filter : req.body.type
//   //     }
//   //   }).then(response => { console.log(response.data)}).catch(error => console.log(error)) 
//   // }
//   // catch (error) {
//   //   console.error(error)
//   // }

//   // Step 2: Play around with the drop downs and see what gets logged.
//   // Use axios to make an API request to the /filter endpoint. Making
//   // sure you're passing both the type and participants queries.
//   // Render the index.ejs file with a single *random* activity that comes back
//   // from the API request.
//   // Step 3: If you get a 404 error (resource not found) from the API request.
//   // Pass an error to the index.ejs to tell the user:
//   // "No activities that match your criteria."
// });

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);});
