const path = require('path');
const express = require('express');
const cors = require('cors');
require('./models/db/connectDB');

const restaurantRouter = require('./routes/restaurant')
const customerRouter = require('./routes/customer')
const deliveryPartnerRouter = require('./routes/deliveryPartner');
const bodyParser = require('body-parser');

const app = express()

const PORT = process.env.PORT || 3001
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.set("view engine","ejs");
app.use(express.json())
app.use(cors())

app.use("/api/restaurants", restaurantRouter)
app.use("/api/customers", customerRouter)
app.use("/api/deliverypartners", deliveryPartnerRouter)

app.get("/api", (req, res) => {
  res.json({message: 'This is swiggy backend'})
});



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// //const bodyParser=require("body-parser")
// const publishable_key="pk_test_51KQtZ1SEQ1Q1nawWLutPTYLP2flhvJbC0TCgYwAXcDJHUZOib5roJZDkZKQDrURbGOA6owe7w6stOeZycx75AX3I00X72eNMu1";
// const secret_key="sk_test_51KQtZ1SEQ1Q1nawWR6ueERYermSxYNfj5BHyGOflugfUOI2YwZl1jjrrpYGCI83DQMqT3a32LHFSzEoheGAZbZnl00FCwjsjYY"
// //const path=require("path")

// const stripe = require('stripe')("sk_test_51KQtZ1SEQ1Q1nawWR6ueERYermSxYNfj5BHyGOflugfUOI2YwZl1jjrrpYGCI83DQMqT3a32LHFSzEoheGAZbZnl00FCwjsjYY") 
// app.set('views', path.join(__dirname, 'views')) 

// app.get("/payment",(req,res)=>{
//     res.render('home',{
//         key:publishable_key
//     })
// })
// app.post('/payment', function(req, res)
// { 
 
//   stripe.customers.create({ 
//       email: req.body.stripeEmail, 
//       source: req.body.stripeToken, 
//       name: 'SWIGGY', 
//       address: { 
//           line1: 'NEW SAHARA ESTATE', 
//           postal_code: '110092', 
//           city: 'ROHINI', 
//           state: 'NEW DELHI', 
//           country: 'INDIA', 
//       } 
//   }) 
//   .then((customer) => { 

//       return stripe.charges.create({ 
//           amount: 7000,     
//           description: 'BILL AMOUNT', 
//           currency: 'INR', 
//           customer: customer.id 
//       }); 
//   }) 
//   .then((charge) => { 
//       res.send("Success") 
//   }) 
//   .catch((err) => { 
//       res.send(err)     
//   }); 
// }) 



app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`)
});