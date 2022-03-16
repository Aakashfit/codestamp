

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'aakash',
    port: 5432,
})


const getRestaurantAllOrders = (request, response) => {

  const {id}=request.params

  pool.query('SELECT * FROM orders ORDER WHERE id = $1',[id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}



const getCustomerAllOrders = (request, response) => {

  const {customerid}=request.params

  pool.query('SELECT * FROM orders ORDER WHERE id = $1',[customerid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}




const addCustomerOrder = (request, response) => {

  const {
    items, 
    request, 
    totalPrice, 
    restaurantId, 
    address,
    landmark,
    city,
    country,
    postalCode,
    phone
  } = req.params


  pool.query('INSERT INTO orders (items,request,totalprice,resturantId,address,landmark,city,country,postalcode,phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [items, request,totalPrice,restaurantId,address,landmark, city,country,postalCode,phone], (error, results) => {
      if (error) {
          throw error
      } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
          throw error
      }
  })
}



module.exports = {
  getRestaurantAllOrders,
  getCustomerAllOrders,
  addCustomerOrder
}


