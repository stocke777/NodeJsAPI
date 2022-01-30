import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String, 
    age: Number
})

export const User = mongoose.model('User', userSchema)