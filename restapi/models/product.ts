import { model, Schema, Document } from 'mongoose'
import Category, { ICategory } from './category'

export interface IProduct extends Document {
    name: string;
    description: string;
    basePrice: number;
    IVA:number;
    oldPrice: number;
    units: number;
    categories: [String];
    onSale: boolean;
    urlImage: string;
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
    basePrice:{
        type: Number,
        required: [true, 'Product must have a price'],
        min: 0.01
    },
    IVA:{
        type: Number,
        required: [true, 'Product must have an IVA'],
    },
    oldPrice:{
        type: Number,
        required: false   
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
    },
    urlImage:{
        type: String,
        required: [true, 'Product must have a photo']
    }
})

const Product = model<IProduct>("Product", productSchema)

export default Product