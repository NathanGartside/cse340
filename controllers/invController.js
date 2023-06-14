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

/* ***************************
 *  Build the management view
 * ************************** */
invCont.buildMangement = async function (req, res, next) {
  let nav = await utilities.getNav()
  const dropDown = await utilities.getDropDown();
  res.render("./inventory/management", {
    title: 'Vehicle Management',
    nav,
    dropDown,
  })
}

/* ***************************
 *  Build the add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: 'Add New Classification',
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build the add car view
 * ************************** */
invCont.buildAddCar = async function (req, res, next) {
  let nav = await utilities.getNav()
  let dropDown = await utilities.getDropDown()
  res.render("./inventory/add-inventory", {
    title: 'Add New Car',
    nav,
    errors: null,
    dropDown,
  })
}

/* ****************************************
*  Process New Classification
* *************************************** */
invCont.addNewClass = async function(req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body;

  const newClassResults = await invModel.newClassification(classification_name)

  if(newClassResults) {
    nav = await utilities.getNav()
    req.flash(
      "notice",
      `Congratulations, you\'re added ${classification_name}.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, we could not add the classification.")
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
    })
  }
}

/* ****************************************
*  Process New Car
* *************************************** */
invCont.addNewCar = async function(req, res) {
  let nav = await utilities.getNav()
  let dropDown = await utilities.getDropDown()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;

  const newCarResults = await invModel.newInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

  if(newCarResults) {
    nav = await utilities.getNav()
    req.flash(
      "notice",
      `Congratulations, you\'re added ${inv_year} ${inv_make} ${inv_model}.`
    )
    res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
    })
  } else {
    let dropDown = await utilities.getDropDown(classification_id)
    req.flash("notice", "Sorry, we could not add the car.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      dropDown,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

module.exports = invCont