import { Request, Response } from "express";
import User from "../models/user";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.dni || !req.body.confirmPassword)
        return res.status(400).json({ msg: "Please. Send your username, email, dni and password" });

    if (req.body.password !== req.body.confirmPassword)
        return res.status(400).json({ msg: "Password and confirm password don't match" });

    let user = await User.findOne({ username: req.body.username.toString() });
    if (user)
        return res.status(400).json({ msg: "The username already exists" });
    user = await User.findOne({ email: req.body.email.toString() });
    if (user)
        return res.status(400).json({ msg: "The email already exists" });


    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.username || !req.body.password)
        return res.status(400).json({ msg: "Please. Send your username and password" });

    const user = await User.findOne({ username: req.body.username.toString() });
    if (!user)
        return res.status(400).json({ msg: "The username or password are incorrect" });

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) 
        return res.status(200).json({ msg: "Logged in" });

    return res.status(400).json({ msg: "The username or password are incorrect" });
};

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const users = await User.find();

    return res.status(200).json({ users });
};

export const findByUsername = async (req: Request, res: Response): Promise<Response> => {
    if(!req.params.username)
        return res.status(400).json({ msg: "Please. Send any username." });

    const user = await User.find({ username: req.params.username });

    return res.status(200).json({ user });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    if(!req.params.username)
        return res.status(400).json({ msg: "Please. Send any username." });
    
    const user = await User.findOneAndDelete({ username: req.params.username });

    return res.status(200).json({ user });
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const {...user} = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, user);

    return res.status(200).json({ updatedUser });
};