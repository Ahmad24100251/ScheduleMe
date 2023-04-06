const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const urlDB = "mongodb://127.0.0.1:27017/testdb";

// Connect to the MongoDB database
mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("Connected to the database");
});

const indexHtmlPath = path.join(__dirname, "..");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true
}));

app.post('/login', (req, res) => {
  const { username } = req.body;
  req.session.username = username;
  res.redirect('/welcomeUser.html');
});


app.use(express.static(indexHtmlPath + '/css'));
app.use(express.static(indexHtmlPath + '/html'));
app.use(express.static(indexHtmlPath + '/js'));
app.use(express.static(indexHtmlPath));

const signupRouter = require("./signup");
app.use(signupRouter);

const loginRouter = require("./login");
app.use(loginRouter);

const changePasswordRouter = require("./changePassword");
app.use(changePasswordRouter);
const addGratitudeRouter = require("./addGratitude");
app.use(addGratitudeRouter);
const getMostRecentGratitude = require("./getMostRecentGratitude");
app.use(getMostRecentGratitude);
const addTasks = require("./addTasks");
app.use(addTasks);
const getTasks = require("./getTasks");
app.use(getTasks);
const getReminders = require("./getReminders");
app.use(getReminders)

const delTasks = require("./deleteTasks");
app.use(delTasks);

app.get("/", (req, res) => {
  res.sendFile(indexHtmlPath + "/html/index.html");
});

app.listen(3000, () => {
  console.log("Server started on 3000");
});
