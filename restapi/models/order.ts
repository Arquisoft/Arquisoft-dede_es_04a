import { model, Schema, Document } from 'mongoose'
import { IAddress } from './user';

export interface IOrder extends Document {
    products: [String],
    user: string,
    address: IAddress,
    shippingCost: number,
    totalPrice: number
}

const orderSchema = new Schema ({
    products: {
        type: [String],
        required: [true, 'Order must have at least one product']
    },
    address: {
        type: String,
        required: [true, 'Order must have an address']
    },
    user: {
        type: String,
        required: [true, 'Order must have a user email']
    },
    shippingCost: {
        type: Number,
        required: [true, 'Order must have a shipping cost']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Order must have a price'],
        min: 0.01
    }
})

const Order = model<IOrder>("Order", orderSchema);

export default Order;