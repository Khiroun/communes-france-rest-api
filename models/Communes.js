const mongoose = require("mongoose");

const CommuneScheme = new mongoose.Schema({
  nom: String,
  code: String,
  //codeDepartement: String,
  //codeRegion: String,
  //codesPostaux: [String],
});
module.exports = mongoose.model("Commune", CommuneScheme);
