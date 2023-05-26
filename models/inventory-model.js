const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
    )
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  if (classification_id == 'broken') {
    throw new Error('This link does not work')
  } else {
    try {
      const data = await pool.query(
        "SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1",
        [classification_id]
      )
      return data.rows
    } catch (error) {
      console.error("getclassificationsbyid error " + error)
    }
  }
}

/* ***************************
 *  Get car by car_id
 * ************************** */
async function getInventoryByCarId(car_id) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory WHERE inv_id = $1",
      [car_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryByCarId error " + error)
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryByCarId}