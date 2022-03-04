import { model, Schema, Document } from 'mongoose'

export interface IProduct extends Document {
    name: string,
    description: string,
    price: number,
    units: number,
    categories: [string],
    onSale: boolean
}

const productSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Product must have a name']
    },
    description:{
        type: String,
        required: [true, 'Product must have a description']
    },
    price:{
        type: Number,
        required: [true, 'Product must have a price'],
        min: 0.01
    },
    units:{
        type: Number,
        required: [true, 'Product must have units'],
        min: 0
    },
    categories:{
        type: [String],
        required: [true, 'Product must have one categories at least']
    },
    onSale:{
        type: Boolean,
        required: true
    }
})

const Product = model<IProduct>("Product", productSchema)

export default Product