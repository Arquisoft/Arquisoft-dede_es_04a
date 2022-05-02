import { Request, Response } from "express";
import User, { IAddress } from "../models/user";
import { getSolidDataset, getThing, getStringNoLocale } from "@inrupt/solid-client";
import jwt from 'jsonwebtoken';

import { VCARD } from "@inrupt/vocab-common-rdf";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.dni || !req.body.confirmPassword)
        return res.status(400).json({ msg: "Please. Send your username, email, dni and password" });

    if (req.body.password !== req.body.confirmPassword)
        return res.status(412).json({ msg: "Password and confirm password don't match" });

    let user = await User.findOne({ username: req.body.username.toString() });
    if (user)
        return res.status(413).json({ msg: "The username already exists" });
    user = await User.findOne({ email: req.body.email.toString() });
    if (user)
        return res.status(414).json({ msg: "The email already exists" });


    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.password)
        return res.status(400).json({ msg: "Please. Send your username and password" });

    const user = await User.findOne({ username: req.body.username.toString() });
    if (!user)
        return res.status(401).json({ msg: "The username or password are incorrect" });

    if (!user.status) {
        return res.status(403).json({ msg: "This user is banned" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const tokenSecret = process.env.SECRET;

        const userForToken = {
            id: user._id,
            name: user.username,
            email: user.email
        }

        const token = jwt.sign(userForToken, tokenSecret!, {
            expiresIn: '10m'
        });

        const userResult = {
            username: user.username,
            userEmail: user.email,
            userRol: user.rol
        }

        return res.status(200).header('authorization', token).json({
            token, userResult
        });

    }
    return res.status(401).json({ msg: "The username or password are incorrect" });
};

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const users = await User.find();

    return res.status(200).json({ users });
};

export const findByUsername = async (req: Request, res: Response): Promise<Response> => {
    if (!req.params.username)
        return res.status(400).json({ msg: "Please. Send any username." });

    const user = await User.find({ username: req.params.username });

    return res.status(200).json({ user });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    if (!req.params.username)
        return res.status(400).json({ msg: "Please. Send any username." });

    const user = await User.findOneAndUpdate({ username: req.params.username }, { status: false });

    return res.status(200).json({ user });
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { ...user } = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, user);

    return res.status(200).json({ updatedUser });
};

export const readAddress = async (req: Request, res: Response): Promise<Response> => {

    const name = req.body.pod;

    try {
        var url = "https://" + name + ".inrupt.net/profile/card";

        const myDataset = await getSolidDataset(
            url, {
            fetch: fetch
        });

        const profile = getThing(myDataset, "https://" + name + ".inrupt.net/profile/card#me")
        let idAddress;
        
        try {
            const addressWebID = profile!.predicates["http://www.w3.org/2006/vcard/ns#hasAddress"]["namedNodes"]
            idAddress = addressWebID![0].split('#')[1]
        } catch(error) {
            return res.status(400).json({ msg: "We can't find an address" });
        }

        if (idAddress == null) {
            return res.status(400).json({ msg: "We can't find an address" });
        }

        let result = {} as IAddress;

        const getAddress = getThing(myDataset, "https://" + name + ".inrupt.net/profile/card#" + idAddress);
        const country = getStringNoLocale(getAddress!, VCARD.country_name);
        if (country == null) {
            return res.status(400).json({ msg: "We can't find the country." });
        } else {
            result.country_name = country;
        }
        const region = getStringNoLocale(getAddress!, VCARD.region);
        if (region == null) {
            return res.status(400).json({ msg: "We can't find the region." });
        } else {
            result.region = region;
        }
        const locality = getStringNoLocale(getAddress!, VCARD.locality);
        if (locality == null) {
            return res.status(400).json({ msg: "We can't find the locality." });
        } else {
            result.locality = locality;
        }

        const streetAddress = getStringNoLocale(getAddress!, VCARD.street_address);
        if (streetAddress == null) {
            return res.status(400).json({ msg: "We can't find the street of this address." });
        } else {
            result.street_address = streetAddress;
        }

        const postalCode = getStringNoLocale(getAddress!, VCARD.postal_code);
        if (postalCode == null) {
            return res.status(400).json({ msg: "We can't find the postal code." })
        } else {
            result.postal_code = postalCode;
        }

        return res.status(200).json({ result });
    } catch (error) {
        return res.status(404).json({ msg: "We can't find a POD with this username." })
    }
}