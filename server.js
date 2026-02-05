import exp from 'express'
import { hash,compare } from 'bcryptjs'
import { userApp } from './APIs/UserAPI.js'
import {connect} from 'mongoose'
import { productApp } from './APIs/ProductAPI.js'
import cookieParser from 'cookie-parser'
const app = exp()
const port = 4000

//connect to db server
async function connectDB()    {
    try{
        await connect('mongodb://localhost:27017/anuragdb2')
        console.log("DB connected successfully")
        //Assign port
        app.listen(port, () => console.log("Server is listening on Port 4000"))
    }catch(err) {
        console.log("Error in DB connection", err)
    }
}

connectDB()

//body parser middleware
app.use(exp.json())

//add cookieParser middleware
app.use(cookieParser())

app.use('/user-api', userApp)
app.use('/product-api', productApp)

//error handling middleware
app.use((err, req, res, next) =>    {
    res.status(500).json({message:"error", reason:err})
})