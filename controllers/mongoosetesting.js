import {User} from '../models/user.js';

import mongoose from 'mongoose';

async function main() {
    console.log("connected")
    await mongoose.connect('mongodb://localhost:27017/testing');
}



async function abc(user){
    const u = await new User({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
    })
    await u.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    })
    console.log(u.firstName, u.lastName)
}
// let u = {
//     firstName: "euclid",
//     lastName: "borus",
//     age: 1234
// }
// abc(u)
// main()
export const blah = "ndnosia"