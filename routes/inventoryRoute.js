// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/inventory-validation')
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:carId", utilities.handleErrors(invController.buildByCarId));
router.get("/management", utilities.handleErrors(invController.buildMangement));
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

router.post("/add-classification", regValidate.classificationRules(), regValidate.checkNewClassData, utilities.handleErrors(invController.addNewClass));

module.exports = router;