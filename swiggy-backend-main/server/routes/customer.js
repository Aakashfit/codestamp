const express = require('express')
const router = express.Router()

const {
  getAllCustomers,
  registerCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomer,
  getAllOrders,
  addOrder
} = require('../controllers/customer')

router.get('/getAllcustomers', getAllCustomers)
router.post('/register', registerCustomer)
router.post('/login', loginCustomer)
router.patch('/:id/update', updateCustomer)
router.delete('/:id/delete', deleteCustomer)

router.get('/:id/orders/allOrders', getAllOrders)
router.post('/:id/orders/add', addOrder)

module.exports = router