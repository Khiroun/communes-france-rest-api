const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Commune = require("./models/Communes");
const Estimation = require("./models/Estimations");
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
app.post("/estimation", (req, res) => {
  const estimation = Estimation({
    ID: req.body.ID,
    INSEE_COM: req.body.INSEE_COM,
    INSEE_DEP: req.body.INSEE_DEP,
    INSEE_REG: req.body.INSEE_REG,
    CODE_EPCI: req.body.CODE_EPCI,
    NOM_COM_M: req.body.NOM_COM_M,
    POPULATION: req.body.POPULATION,
    Nb_Ventes: req.body.Nb_Ventes,
    PrixMoyen_M2: req.body.PrixMoyen_M2,
  });
  estimation
    .save()
    .then((estimation) => {
      res.json(estimation);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get("/estimations/:INSEE_COM", (req, res) => {
  const INSEE_COM = req.params.INSEE_COM;
  Estimation.find({ INSEE_COM })
    .limit(10)
    .exec((err, estimations) => {
      if (err) {
        res.send(err);
      }
      res.json(estimations);
    });
});
app.listen(process.env.PORT || 3000);
/**
 * 
 mongodb+srv://admin:nfcWB5uhhPjn_5n@communesfrance.qqqxq.mongodb.net/test
 */
