import { model, Schema } from 'mongoose'

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required : [true, 'Categories must have a name']
    }
})

const Category = model('Category', categorySchema)
module.exports = Category