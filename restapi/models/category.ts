import { model, Schema, Document } from 'mongoose'

export interface IProduct extends Document {
    categoryName: string
}

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: [true, 'Categories must have a name']
    }
})

const Category = model<IProduct>("Category", categorySchema)

export default Category