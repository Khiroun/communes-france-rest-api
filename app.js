const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Commune = require("./models/Communes");
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routes

mongoose.connect(
  "mongodb+srv://admin:nfcWB5uhhPjn_5n@communesfrance.qqqxq.mongodb.net/main",
  (err) => {
    if (err) {
      console.log("Error connecting to MongoDB");
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.get("/communes", (req, res) => {
  const search = req.query.search;
  console.log({ search });
  const re = new RegExp(search, "i");
  Commune.find({ nom: re })
    .limit(10)
    .exec((err, communes) => {
      if (err) {
        res.send(err);
      } else {
        res.json(communes);
      }
    });
});
app.post("/communes", (req, res) => {
  const commune = Commune({
    nom: req.body.nom,
    code: req.body.code,
  });
  commune
    .save()
    .then((commune) => {
      res.json(commune);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.listen(process.env.PORT || 3000);
/**
 * 
 mongodb+srv://admin:nfcWB5uhhPjn_5n@communesfrance.qqqxq.mongodb.net/test
 */
