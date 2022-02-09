import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String, 
    age: Number,
    password: String
})


const RefreshTokenSchema = new mongoose.Schema({
    token: String
})



export const User = mongoose.model('User', userSchema)
export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema)