import {Schema, model} from 'mongoose'

//create product schema
const productSchema = new Schema({
    pid:{
        type:Number,
        required:[true, "ID must be entered"]
    },
    productName:{
        type:String,
        required:[true, "product name must be entered"],
        minLength:[6, "Minimum 6 characters"],
        maxLength:[12, "Maximum of 12 characters"]
    },
    price:{
        type:Number,
        required:[true, "Price of the product must be entered"]
    }
}, {
    strict:true,
    timestamps:true
})

//export
export const ProductModel = model("product", productSchema)