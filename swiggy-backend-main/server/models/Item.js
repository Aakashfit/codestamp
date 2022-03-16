
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'aakash',
    port: 5432,
})


const getRestaurantAllItems = async (id) => {
    pool.query('SELECT * FROM resturantitem ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}





const addRestaurantItem = (request, response) => {
  const { category,name,price,description} = req.params



  pool.query('INSERT INTO resturantitem (category,name,price,description) VALUES ($1, $2, $3, $4) RETURNING *', [category,name, price,description], (error, results) => {
      if (error) {
          throw error
      } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
          throw error
      }
      
  })
}


const deleteRestaurantItem = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM resturantitem WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
  })

}

 



module.exports = {
  getRestaurantAllItems,
  addRestaurantItem,
  updateRestaurantItem,
  deleteRestaurantItem
}