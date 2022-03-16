const express = require('express')
const router = express.Router()
const {
  getAllDeliveryPartners,
  registerDeliveryPartner,
  loginDeliveryPartner,
  updateDeliveryPartner,
  deleteDeliveryPartner
} = require('../controllers/deliveryPartner')

router.get('/getAllDeliveryPartner', getAllDeliveryPartners)
router.post('/register', registerDeliveryPartner)
router.post('/login', loginDeliveryPartner)
router.patch('/:id/update', updateDeliveryPartner)
router.delete('/:id/delete', deleteDeliveryPartner)

module.exports = router