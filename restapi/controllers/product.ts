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
    // if (!req.body.name || !req.body.description || !req.body.price || !req.body.units || !req.body.categories)
    //     return res.status(400).json({ msg: "Please, complete all the fields" })

    const newProduct = new Product(req.body);
    // Upload images to cloudinary
    await cloudinary.v2.uploader.upload(newProduct.urlImage).then((image: UploadApiResponse) => {
        newProduct.urlImage = image.secure_url;
        newProduct.save();
    });
    return res.status(200).json({newProduct});
};

// Update a product.
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { ...product} = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
    return res.status(200).json({updatedProduct});
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete( id ).then((product) => {
        var url = product?.urlImage.split("/");
        var publicId = url?.at(url?.length - 1)?.split(".").at(0);
        cloudinary.v2.uploader.destroy(publicId!);
    });
    return res.status(200).json({deletedProduct});
};

// Find by category
export const findByCategory = async (req: Request, res: Response): Promise<Response> => {
    if (!req.params.categories)
        return res.status(400).json({msg: "Please, send a category"});
        
    const products = await Product.find({categories: req.params.categories});
    return res.status(200).json({products});
};