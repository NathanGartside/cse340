const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by car view
 * ************************** */
invCont.buildByCarId = async function (req, res, next) {
  const car_id = req.params.carId
  const data = await invModel.getInventoryByCarId(car_id)
  const info = await utilities.buildInventoryInfo(data)
  let nav = await utilities.getNav()
  const carName = `${data.inv_year} ${data.inv_make} ${data.inv_model}`
  res.render("./inventory/car", {
    title: carName,
    nav,
    info,
  })
}

invCont.buildMangement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: 'Vehicle Management',
    nav,
  })
}


module.exports = invCont