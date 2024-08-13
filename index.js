const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRouter = require('./router/UserRouter')
const ProductRouter = require('./router/ProductRouter')
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





app.listen(3001, ()=> {
    console.log("Server running")
})


