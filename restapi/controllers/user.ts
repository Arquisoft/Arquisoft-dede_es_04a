import { Request, Response } from "express";
import User, { IUser } from "../models/user";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.email || !req.body.password)
        return res.status(400).json({ msg: "Please. Send your username, email and password" })

    const user = await User.findOne({ username: req.body.username, email: req.body.email });
    if (user)
        return res.status(400).json({ msg: "The User already Exists" })

    const newUser = new User(req.body)
    await newUser.save()
    return res.status(200).json(newUser)
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    if ((!req.body.username || !req.body.email) || !req.body.password)
        return res.status(400).json({ msg: "Please. Send your username or email and password" });

    const user = await User.findOne({ username: req.body.username, email: req.body.email });
    if (!user)
        return res.status(400).json({ msg: "The User does not exists" });

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(400).json({ user });
    }

    return res.status(400).json({
        msg: "The email or password are incorrect"
    })
}