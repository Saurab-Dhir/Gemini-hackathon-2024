const express = require("express");
const app = express();
const port = 3000;

const test = {
  saurab: "abc",
};

app.get("/", (req, res) => {
  res.send(test);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
