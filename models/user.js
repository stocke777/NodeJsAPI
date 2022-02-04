import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String, 
    age: Number,
    password: String
})

const catSchema = new mongoose.Schema({
    name: String,
    age: Number
})

catSchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
};

export const User = mongoose.model('User', userSchema)
export const Cat = mongoose.model('Cat', catSchema)