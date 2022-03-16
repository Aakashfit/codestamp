const path = require('path')
const jwt = require('jsonwebtoken')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') })
ACCESS_TOKEN_SECRET="AKAKAKAKAKAKAK"
const verifyJWTToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodeToken) => {
      if(err || !decodeToken) {
        return reject(err)
      }

      resolve(decodeToken)
    })
  })
}

const createJWTToken = (payload) => {
  return jwt.sign(payload,ACCESS_TOKEN_SECRET )
}

module.exports = {
  verifyJWTToken,
  createJWTToken
}