import express from "express";
const app = express()

app.set("view engine", "ejs");
app.use(express.static("public"));

var day = new Date().getDate()

app.get("/", (req, res) => {
    var today = new Date("2025/12/14").getDay()
    var day_message = {
        0 : "Sunday",
        1 : "Monday",
        2 : "Tuesday",
        3 : "Wednesday",
        4 : "Thursday",
        5 : "Friday",
        6 : "Saturday"
    }
    var day = day_message[today]

    if (today === 0 || today === 6){
        var message = "It's time to rest! :)"
    }
    else{
        var message = "It's time to work hard 🔥"
    }
    res.render("index", {
        day,
        message,
    });

});

app.listen(3000, () => {
    console.log("Server Test on http://localhost:3000");
});