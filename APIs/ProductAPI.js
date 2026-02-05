import exp from 'express'
import { ProductModel } from '../Models/ProductModel.js'
export const productApp = exp.Router()


//Create product
productApp.post('/products', async(req,res) =>    {
    //get newproduct from req
    let newProduct = req.body

    //create new product document
    let newProductDoc = new ProductModel(newProduct)
    
    //save in db
    await newProductDoc.save()

    res.status(201).json({message:"Product created"})
})
//Read product
productApp.get('/products', async(req, res) =>    {
    //read products from DB
    let product = await ProductModel.find()
    //send res
    res.status(200).json({message:"products", payload:product})
})

//Read product by ObjectID
productApp.get('/products/:id', async(req, res) =>    {
    //get ObjectID from url parameter
    let objID = req.params.id

    //find product in DB
    let productObj = await ProductModel.findById(objID)

    //send res
    res.status(200).json({message:"product",payload:productObj})
})

//Update product
productApp.put('/products/:id', async(req, res) => {
    //get objId from url
    let objId = req.params.id

    //get modified product from req
    let modifiedProduct = req.body

    //make update
    let latestProduct = await ProductModel.findByIdAndUpdate(objId, { $set: { ...modifiedProduct}})

    //send res
    res.status(200).json({message:"product modified"})
})

//Delete product by objId
productApp.delete('/products/:id', async(req, res) => {
    //get objId from url
    let objId = req.params.id

    //delete product by id
    let deletedProduct = await ProductModel.findByIdAndDelete(objId)
    res.status(200).json({message:"Product deleted", payload:deletedProduct})
})