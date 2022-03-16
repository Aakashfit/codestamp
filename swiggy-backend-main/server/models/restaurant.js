const path = require('path')


require("dotenv").config({ path: path.resolve(__dirname, '../.env') })
const { createJWTToken } = require('../libs/auth')
const { ROLE } = require("../utils/Role")
const { 
  generateHashPassword, 
  comparePassword 
} = require('../utils/generateHashPassword')


const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'aakash',
    port: 5432,
})



const getAllRestaurantsDocument = (request, response) => {
  pool.query('SELECT * FROM resturant ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}


const deleteRestaurantDocument = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM resturant WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).send(`resturant deleted with ID: ${id}`)
  })

}




const register = (request, response) => {
  const { 
        name, 
        ownerName, 
        email,  
        password, 
        phone, 
        address, 
        landmark, 
        city, 
        country, 
        postalCode, 
        cuisines, 
        isRestaurantVeg
      } = req.params

  const passwordHash = await generateHashPassword(password)

  pool.query('INSERT INTO users (name, ownerName,email,password,phone,address,landmark,city,country,postalCode,cuisines,isRseturantVeg) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [name,ownerName ,email, passwordHash, phone,address,landmark,city,country,postalCode,cuisines,isRestaurantVeg], (error, results) => {
      if (error) {
          throw error
      } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
          throw error
      }const payload = { id: customer._id };
      const accessToken = createJWTToken(payload);
      
      return { accessToken };
  })
}




const login = (request, response) => {

  const email=request.params.email
  const password=request.params.password
  const password=await comparePassword(password)

  pool.query('SELECT * FROM resturant WHERE email = $1 AND password=$2', [email,password], (error, results) => {
      if (error) {
          throw error
      }
      const payload = { id: customer._id };
      const accessToken = createJWTToken(payload);
      return { accessToken };
      response.status(200).json(results.rows)
  })
}
const getAllRestaurantsDocument = (request, response) => {
  pool.query('SELECT * FROM customer ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}





module.exports = {
  getAllRestaurantsDocument,
  deleteRestaurantDocument,
  register,
  login
}