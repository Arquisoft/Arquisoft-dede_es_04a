import { model, Schema, Document } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
    dni: string,
    username: string
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<Boolean>
}

const userSchema = new Schema({
    dni: {
        type: String,
        require: [true, "Dni is mandatory"],
        unique:true
    },
    username: {
        type: String,
        require: [true, "Username is mandatory"],
        unique: true
    },
    email: {
        type: String,
        require: [true, "Email is mandatory"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Password is mandatory"]
    },
    rol: {
        type: Number,
        required: [true, "Rol is mandatory"]
    }
})

// Encrypt the password
userSchema.pre<IUser>("save", async function (next) {
    const user = this

    if (!user.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash

    next()
})

// Compares the entered password with the one in the database
userSchema.methods.comparePassword = async function (
    password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password)
}

const User = model<IUser>("User", userSchema)

export default User