import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, 'Username is mandatory']
    },
    password: {
        type: String,
        require: [true, 'Password is mandatory']
    },
    email: {
        type: String,
        require: [true, 'Email is mandatory']
    }
})
 const User = model('User', userSchema)

 module.exports = User
