const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./router/UserRouter')
const ProductRouter = require('./router/ProductRouter')
const ClientRouter= require ('./router/ClientRouter')
const CategoryRouter = require('./router/CategoryRouter')
<<<<<<< HEAD
const OrdersRouter = require('./router/OrdersRouter')
const Order_ProductRouter = require('./router/Order_ProductRouter')
const Order_ClientRouter = require('./router/Order_ClientRouter')
=======
const SaleRouter = require('./router/SaleRouter')
>>>>>>> 6d31e71b9e398a179608444ae44024f727d9f223
const cors = require('cors')
const morgan = require('morgan')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors('*'))
app.use(morgan('tiny'))
// parse application/json
app.use(bodyParser.json())

// app.get('/user' , (req,res)=>{
//     res.json({success: true})
// })


app.use('/user', userRouter)

app.use('/product', ProductRouter)

app.use('/clients' , ClientRouter)

app.use('/category', CategoryRouter )

<<<<<<< HEAD
app.use ('/order',OrdersRouter)

app.use ('/OrderProduct', Order_ProductRouter)

app.use ('/OrderClient', Order_ClientRouter)
=======
app.use('/sale', SaleRouter)

>>>>>>> 6d31e71b9e398a179608444ae44024f727d9f223

app.listen(3001, ()=> {
    console.log("Server running")
})


