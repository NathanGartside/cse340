const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

validate.classificationRules = () => {
    console.log('test')
    return [
        //classification_name is required and must be only letters
        body("classification_name")
        .trim()
        .isAlpha()
        .withMessage('Please provide a valid classification name')
    ]
}

validate.checkNewClassData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty())
    {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
          errors,
          title: "Add New Classification",
          nav,
          classification_name,
        })
        return
      }
      next()
}

module.exports = validate