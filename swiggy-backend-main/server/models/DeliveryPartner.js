
const { generateHashPassword, comparePassword } = require('../utils/generateHashPassword')
const { createJWTToken } = require('../libs/auth')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'aakash',
  port: 5432,
})




const getAllDeliveryPartnersDocument = (request, response) => {
  pool.query('SELECT * FROM deliverypartner ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}



const register = (request, response) => {

  const { name, email, password, phone,servicearea,city,country,role,vehicle } = request.params;
  const passwordHash = await generateHashPassword(password)

  pool.query('INSERT INTO deliverypartner (name, email,password,phone,servicearea,city,country,vehicle) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, email, passwordHash, phone,servicearea,city,country,role,vehicle], (error, results) => {
      if (error) {
          throw error
      } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
          throw error
      }const payload = { id: customer._id };
      const accessToken = createJWTToken(payload);
      
      return { accessToken };
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}



const login = (request, response) => {

  const email=request.params.email
  const password=request.params.password
  const password=await comparePassword(password)

  pool.query('SELECT * FROM deliverypartner WHERE email = $1 AND password=$2', [email,password], (error, results) => {
      if (error) {
          throw error
      }
      const payload = { id: customer._id };
      const accessToken = createJWTToken(payload);
      return { accessToken };
      response.status(200).json(results.rows)
  })
}




const deleteDeliveryPartnerDocument = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM deliverypartners WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).send(`deliverypartner deleted with ID: ${id}`)
  })

}


module.exports = {
  getAllDeliveryPartnersDocument,
  register,
  login,
  deleteDeliveryPartnerDocument
}
