const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middlewares/authenticateToken')

const {
  getAllRestaurants,
  getRestaurant,
  deleteRestaurant,
  registerRestaurant,
  loginRestaurant,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  getAllOrders,
} = require('../controllers/restaurant')

router.get('/getAllResturants', getAllRestaurants)
router.get('/:id', getRestaurant)
router.delete('/:id/delete', authenticateToken, deleteRestaurant)
router.post('/register', registerRestaurant)
router.post('/login', loginRestaurant)


router.get('/:id/items/getAll',authenticateToken, getAllItems)
router.post('/:id/items/add',authenticateToken, addItem)
router.patch('/:id/items/:itemId/update', updateItem)
router.delete('/:id/items/:itemId/delete', deleteItem)

router.get('/:id/orders', getAllOrders)


module.exports = router;