import { model, Schema, Document } from 'mongoose'

export interface ICategory extends Document {
    categoryName: string;
}

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: [true, 'Categories must have a name']
    }
})

const Category = model<ICategory>("Category", categorySchema)

export default Category