import { Request, Response } from "express";
import Order from "../models/order";
import Product from "../models/product";

const shippo = require('shippo')('shippo_test_e569cbc523acb20b5a6c3b22788bfc0898cda51b');
const nodeMailer = require("nodemailer");

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const orders = await Order.find();
    const today = new Date()

    orders.forEach(order => {
        if (order.status != "RECEIVED") {
            if (order.receptionDate <= today) {
                order.status = "RECEIVED"
            } else if (order.orderDate < today) {
                order.status = "ON DELIVERY"
            }
            order.save();
        }
    });
    return res.status(200).json({ orders });
};

export const findById = async (req: Request, res: Response): Promise<Response> => {
    if(!req.params.id){
        return res.status(400).json({ msg: "Please. Send an ID" });
    }
    const order = await Order.findById(req.params.id);

    return res.status(200).json({ order });
};

export const findByUsername = async (req: Request, res: Response): Promise<Response> => {
    if(!req.params.email){
        return res.status(400).json({ msg: "Please. Send an ID" });
    }
    const orders = await Order.find({ user: req.params.email });

    return res.status(200).json({ orders });
};

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.products || !req.body.address || !req.body.user || !req.body.shippingCost || !req.body.totalPrice || !req.body.receptionDate)
        return res.status(400).json({ msg: "Please, complete all the fields" });

    const address = `${req.body.address.street_address}, ${req.body.address.locality}, ${req.body.address.region}, ${req.body.address.postal_code}, ${req.body.address.country_name}`;

    req.body.address = address;

    const newOrder = new Order(req.body);
    await newOrder.save();
    
    const info = {
        email: req.body.user,
        id : newOrder.id,
        products : req.body.products
    }
    
     sendMailToClient(info);
    
    return res.status(200).json({ newOrder });
};

async function sendMailToClient(info: { email: string; id: string; products: any; }){
    let body = info

    console.log(body)

    var transporter = nodeMailer.createTransport({
        secure: 'true',
        service: 'gmail',
        auth: {
          user: 'dede4aes@gmail.com',
          pass: process.env.PASS1
        }
      });
      
      let message = "Dear buyer, below you will find the products of your last purchase.\n" + 
      "The identifier is " + body.id + " in case you wish to review it on our website\nThe order summary is:\n"

      const products = new Map(Object.entries(body.products));

      for(let [key, value] of products){
          message += "\t- Product: "+ key + " Units: " + value +"\n";  
      }

      message += "\nWe hope you will buy again soon!\nTech Zone"

      const mailOptions = {
        from: 'dede4aes@gmail.com',
        to: body.email,
        subject: 'Order summary',
        text: message
      };
      
       transporter.sendMail(mailOptions);
}

export const updateStatus = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.orderId || !req.body.status)
        return res.status(400).json({ msg: 'Please, complete all the fields' });

    await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });

    return res.status(200).json({ msg: 'Status updated' });
}

export const getShippingDetails = async (req: Request, res: Response) => {
    const addressFrom = {
        "name": "Tech Zone",
        "street1": "145 W 9th St, Azusa",
        "city": "Azusa",
        "state": "CA",
        "zip": "991702",
        "country": "US"
    };
    const addressTo = {
        "name": req.body.user,
        "street1": req.body.address.street_address,
        "city": req.body.address.locality,
        "state": req.body.address.region,
        "zip": req.body.address.postal_code,
        "country": req.body.address.country_name
    }
    var parcel = {
        "length": "5",
        "width": "5",
        "height": "5",
        "distance_unit": "in",
        "weight": "2",
        "mass_unit": "lb"
    };
    shippo.shipment.create({
        "address_from": addressFrom,
        "address_to": addressTo,
        "parcels": [parcel],
        "async": false
    }, function (err: Error, shipment: { rates: { amount: number, estimated_days: number; }[]; }) {
        if (err) {
            return res.status(400).send(err);
        } else {
            const shippingDetails = {
                amount: shipment.rates[0].amount,
                estimated_days: shipment.rates[0].estimated_days
            }
            return res.status(200).send(shippingDetails);
        }
    });
}
