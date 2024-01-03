const mongoose = require("mongoose");

const PorteurEnchaireSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  ProduitId: {
    type: mongoose.Types.ObjectId,
    ref: "produit",
  },
});
module.exports = mongoose.model("porteur_enchaire", PorteurEnchaireSchema);
