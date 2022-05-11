const mongoose = require("mongoose");

const EstimationsScheme = new mongoose.Schema({
  ID: String,
  INSEE_COM: String,
  INSEE_DEP: String,
  INSEE_REG: String,
  CODE_EPCI: String,
  NOM_COM_M: String,
  POPULATION: String,
  Nb_Ventes: String,
  PrixMoyen_M2: String,
});
module.exports = mongoose.model("Estimation", EstimationsScheme);
