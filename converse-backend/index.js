const express = require("express");
const app = express();
const port = 3000;
const converseRoutes = require("./routes/converseRoutes");

const test = {
  saurab: "abc",
};

app.get("/", (req, res) => {
  res.send(test);
});

// ******************************************************** //
// CONVERSE ROUTE

app.use("/converse", converseRoutes);

// ******************************************************** //

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
