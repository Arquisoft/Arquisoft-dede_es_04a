import cloudinary, { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";
import Product from "../models/product";


// Find all the products
export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const products = await Product.find();

    return res.status(200).json({products});
};

// Create a new product
export const productCreate = async (req: Request, res: Response): Promise<Response> => {
    
    if (!req.body.name || !req.body.description || !req.body.basePrice || !req.body.units || !req.body.category || !req.body.urlImage
        || !req.body.IVA)
        return res.status(400).json({ msg: "Please, complete all the fields" })
 
    const newProduct = new Product(req.body);
 
    // Upload images to cloudinary
    await cloudinary.v2.uploader.upload(newProduct.urlImage).then((image: UploadApiResponse) => {
        newProduct.urlImage = image.public_id;
        newProduct.save();
    });
   
    
    return res.status(200).json({newProduct});
};

// Update a product.
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { ...product} = req.body;

    const oldProduct = await Product.findById(req.params.id);
    // If new price != old price, we update the base price and old price
    if (oldProduct!.basePrice != req.body.basePrice){
        
        product.oldPrice = oldProduct!.basePrice;
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
    return res.status(200).json({product});
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    const deletedProduct = await Product.findByIdAndDelete( id ).then((product) => {
        cloudinary.v2.uploader.destroy(product?.urlImage!);
    });
    return res.status(200).json({msg: "Product deleted"});
};

// Find by category
export const findByCategory = async (req: Request, res: Response): Promise<Response> => {
    if (!req.params.category)
        return res.status(400).json({msg: "Please, send a category"});
        
    const products = await Product.find({category: req.params.category});
    return res.status(200).json({products});
};
