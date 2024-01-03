let Produits = require("../models/ProduitsModel");

let porteur_enchaire = require("../models/porteurEnchaireModel");

let PorteurEnchaireCtrl = {
  CreerPorteurEnchaire: async (req, res) => {
    try {
      let AllProduct = await Produits.find();
      let newDate = new Date();

      filterProduct = AllProduct.filter(
        (item) =>
          item.dateLimite.toString() === newDate.toDateString() &&
          item.mombre_enchere.length != 0
      );
      let res_min =
        filterProduct[0].mombre_enchere[0].prix - filterProduct[0].prix;

      let defirence = 0;
      let iduser = "";
      let idProduct = "";
      for (let i = 0; i < filterProduct.length; i++) {
        for (let j = 0; j < filterProduct[i].mombre_enchere.length; j++) {
          defirence =
            filterProduct[i].mombre_enchere[j].prix - filterProduct[i].prix;

          if (defirence >= 0 && res_min > defirence) {
            res_min = defirence;

            iduser = filterProduct[i].mombre_enchere[j].idUser;
            idProduct = filterProduct[i]._id;

            let newPoroteurEnchaire = new porteur_enchaire({
              UserID: iduser,
              ProduitId: idProduct,
            });

            await newPoroteurEnchaire.save();
          } else {
            iduser = filterProduct[0].mombre_enchere[0].idUser;
            let newPoroteurEnchaire = new porteur_enchaire({
              UserID: iduser,
              ProduitId: filterProduct[0]._id,
            });
            await newPoroteurEnchaire.save();
          }
        }
      }

      res.json({ result: filterProduct });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = PorteurEnchaireCtrl;
