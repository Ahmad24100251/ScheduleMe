const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const urlDB = "mongodb://localhost:27017/testdb"

// Connect to the MongoDB database
mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function() {
  console.log("Connected to the database")
})

const indexHtmlPath = path.join(__dirname, "..")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(indexHtmlPath + '/css'));
app.use(express.static(indexHtmlPath + '/html'));
app.use(express.static(indexHtmlPath + '/js'));
app.use(express.static(indexHtmlPath));

const signupRouter = require("./signup");
app.use(signupRouter);

const loginRouter = require("./login");
app.use(loginRouter);

app.get("/", (req, res) => {
  res.sendFile(indexHtmlPath + "/html/index.html")
})

app.listen(3000, () => {
  console.log("Server started on 3000")
})
