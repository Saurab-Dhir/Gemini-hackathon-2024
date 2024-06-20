const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const readline = require("readline");
const axios = require("axios");
const app = express();
const port = 3000;
const converseRoutes = require("./routes/converseRoutes");
require("dotenv").config({ path: "./cred.env" });

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read the secret key from environment variables
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("Missing SESSION_SECRET in environment variables");
}

// Session middleware setup with a secret key
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

app.get("/", (req, res) => {
  res.send("Welcome to the Gemini chatbot server!");
});

// ******************************************************** //
// CONVERSE ROUTE

app.use("/converse", converseRoutes);

// ******************************************************** //

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Setup readline interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion() {
  rl.question("Enter your message: ", async (message) => {
    try {
      const response = await axios.post(`http://localhost:${port}/converse/geminiAudioStream`, { message }, {
        responseType: 'arraybuffer'
      });
      // Write audio to a file or handle it as needed
      const fs = require('fs');
      fs.writeFileSync('response.mp3', response.data);
      console.log("Audio response saved to response.mp3");
    } catch (error) {
      console.error("Error communicating with server:", error.response?.data || error.message);
    }
    askQuestion(); // Ask for the next message
  });
}

askQuestion();
