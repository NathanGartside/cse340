// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/inventory-validation')
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// Route to build the car view
router.get("/detail/:carId", utilities.handleErrors(invController.buildByCarId));
// Route to build the management view
router.get("/", utilities.handleErrors(invController.buildMangement));
// Route to build the add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
// Route to build the add car view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddCar));
// Route to return classification data as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))
// Route to add the new classification data
router.post("/add-classification", regValidate.classificationRules(), regValidate.checkNewClassData, utilities.handleErrors(invController.addNewClass));
// Route to add the new car data
router.post("/add-inventory", regValidate.inventoryRules(), regValidate.checkNewCarData, utilities.handleErrors(invController.addNewCar));

module.exports = router;