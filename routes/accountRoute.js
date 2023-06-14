// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

//Route to build account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
//Route to build the registration route
router.get("/register", utilities.handleErrors(accountController.buildRegister))
//Route for successful login
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildSuccessfulLogin))
//Route to send registration info
router.post('/register', regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))
// Process the login attempt
router.post("/login", regValidate.loginRules(), regValidate.checkLogData, utilities.handleErrors(accountController.accountLogin))

module.exports = router;