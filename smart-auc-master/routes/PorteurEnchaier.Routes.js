let router = require("express").Router();
let PorteurEnchaireCtrl = require("../controlls/PorteurEnchaireCtrl");

router.get("/proteur_enchaire", PorteurEnchaireCtrl.CreerPorteurEnchaire);

module.exports = router;
