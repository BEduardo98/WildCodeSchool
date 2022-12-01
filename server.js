const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// General settings
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb+srv://FUKCVzToZVIP4gBo:FUKCVzToZVIP4gBo@projetapprentisage.ht2mj1q.mongodb.net/WildCodeSchool", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Create data schema
const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("UsersList", userSchema);

// Render the html,css and also the crew members names
app.use(express.static("public"));
app.get("/", (req, res) => {
  User.find({}, function (err, firstName) {
    res.render("index", {
      userNames: firstName,
    });
  });
});

// Send the form data to MongoDB
app.post("/", function (req, res) {
  let newUser = new User({
    name: req.body.name,
  });
  newUser.save();
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on 3000");
});
