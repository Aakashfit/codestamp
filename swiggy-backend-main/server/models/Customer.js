
const { ROLE } = require("../utils/Role")


const { generateHashPassword, comparePassword } = require('../utils/generateHashPassword')
const { createJWTToken } = require('../libs/auth')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'aakash',
    port: 5432,
})


const getAllCustomersDocument = (request, response) => {
    pool.query('SELECT * FROM customer ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const login = (request, response) => {

    const email=request.params.email
    const password=request.params.password
    const password=await comparePassword(password)

    pool.query('SELECT * FROM customer WHERE email = $1 AND password=$2', [email,password], (error, results) => {
        if (error) {
            throw error
        }
        const payload = { id: customer._id };
        const accessToken = createJWTToken(payload);
        return { accessToken };
        response.status(200).json(results.rows)
    })
}


const register = (request, response) => {

    const { name, email, password, phone } = request.params;
    const passwordHash = await generateHashPassword(password)

    pool.query('INSERT INTO users (name, email,password,phone) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, passwordHash, phone], (error, results) => {
        if (error) {
            throw error
        } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
            throw error
        }const payload = { id: customer._id };
        const accessToken = createJWTToken(payload);
        
        return { accessToken };
    })
}








const deleteCustomerDocument = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })

}

module.exports = {
  getAllCustomersDocument,
  register,
  login,
  deleteCustomerDocument
}
