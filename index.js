//include packages
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

app.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
