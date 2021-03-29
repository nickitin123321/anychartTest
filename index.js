//include packages
const express = require("express");
const fs = require('fs');
const app = express();

app.use(express.static("."));

app.get("/api", (req, res) => {
  try {
    let data = fs.readFileSync('./11.json')
    data = JSON.parse(data);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
