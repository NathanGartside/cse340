// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/inventory-validation')
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:carId", utilities.handleErrors(invController.buildByCarId));
router.get("/", utilities.handleErrors(invController.buildMangement));
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.get("/add-inventory", utilities.handleErrors(invController.buildAddCar));

router.post("/add-classification", regValidate.classificationRules(), regValidate.checkNewClassData, utilities.handleErrors(invController.addNewClass));
router.post("/add-inventory", regValidate.inventoryRules(), regValidate.checkNewCarData, utilities.handleErrors(invController.addNewCar));

module.exports = router;