import { model, Schema, Document } from 'mongoose'
import { IAddress } from './user';

export interface IOrder extends Document {
    products: Map<String, Number>; 
    user: string;
    address: IAddress;
    shippingCost: number;
    totalPrice: number;
    orderDate: Date;
    receptionDate: Date;
    status: string;
}

const orderSchema = new Schema ({
    products: {
        type: Map,
        of: Number,
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
    },
    orderDate: {
        type: Date,
        required: [true, 'Order must have an order date'],
        default: new Date()
    },
    receptionDate: {
        type: Date,
        required: [true, 'Order must have a reception date ']
    },
    status: {
        type: String,
        required: [true, 'Order must have a status'],
        default: 'PREPARING'
    }
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
