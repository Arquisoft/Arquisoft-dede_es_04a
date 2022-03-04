import { model, Schema, Document } from 'mongoose'
import bcrypt from "bcrypt"

export interface IUser extends Document {
    username: string
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<Boolean>
}

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, 'Username is mandatory'],
        unique: true
    },
    email: {
        type: String,
        require: [true, 'Email is mandatory'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password is mandatory']
    }
})

userSchema.pre<IUser>("save", async function (next) {
    const user = this

    if (!user.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash

    next()
})

userSchema.methods.comparePassword = async function (
    password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password)
}

const User = model<IUser>("User", userSchema)

export default User