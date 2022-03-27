import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validateSignUp = [
    body("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Username can't be empty")
        .isLength({min: 5})
        .withMessage("Minimun 5 characters"),
    body("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Email can't be empty")
        .isEmail()
        .withMessage("Email incorrect"),
    body("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password can't be empty")
        .isLength({min: 8})
        .withMessage("Password must be 8 charactes long")
        .isStrongPassword()
        .withMessage("Password must be alphanumeric and contain a special character"),
    body("confirmPassword")
        .custom(async (value, { req }) => {
            if (value !== req.body.password)
                throw new Error("Password and confirm password don't match")
        }),
    body("dni")
        .isLength({min: 9, max: 9}),
    (req: Request, res: Response, next: () => void) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        next();
    }
];