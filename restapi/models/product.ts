import { model, Schema } from 'mongoose'

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
        required : [true, 'Product must have one categories at least']
    },
    onSale:{
        type: Boolean,
        required : true
    }
})

const Product = model('Product', productSchema)
module.exports = Product