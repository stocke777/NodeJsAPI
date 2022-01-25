
import { ObjectId } from "mongodb";
import { default as mongodb } from 'mongodb';
import {default as bcrypt} from 'bcrypt';

let MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017';

let db = {};

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    // Specify database you want to access
    db = client.db('testing');

    console.log(`MongoDB Connected: ${url}`);
});


export const getAllUsers = (req, res)=>{
    let customers = db.collection('customers');
    customers
        .find({})
        .toArray((err, results) => {
        res.send(results);
    });
};

export const getUser = (req, res)=>{
    const {id} = req.params;
    let customers = db.collection('customers');
    try{
        customers.find({_id:ObjectId(id)}).toArray((err, results) => {
            if (err) throw err;
            if(results.length === 0){
                res.send("No user found with this ID");
            }else{
                res.send(results);
            }
        });
    }
    catch(e){
        res.send("Invalid Id");
    }
};

export const createUser = async (req, res)=>{
    const user = req.body;

    if (!user.password) res.send("Please provide password!!!");

    try{

        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(user.password, salt);

        let customers = db.collection('customers');
        customers.insertOne({ firstName: user.firstName, lastName: user.lastname, age: user.age, password: hashedpassword }, (err, result) => {
            if(err) throw err;
        });
    }
    catch(e){
        res.send("Provide correct details please.")
    }
    res.send(`User with name ${user.firstName} saved.`);
};

export const loginUser = (req, res)=>{
    const {id} = req.params;

    try{
        let customers = db.collection('customers');
        let user = {}
        customers.find({_id:ObjectId(id)}).toArray((e, r)=>{
            if(e) throw e;
            user = r[0];
            console.log(r[0]);
            if(!user){
                return res.status(400).send("Cant find User with this id");
            }else{
                try{
                    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                        if (err) {
                        throw err
                        } else if (!isMatch) {
                        console.log("Password doesn't match!")
                        return res.send("Password not matched")
                        } else {
                        console.log("Password matches!")
                        return res.send("Success Login")
                        }
                    })
                }catch(e){
                    return res.send("Login Failed")
                }
            }
        });
    }catch(e){
        return res.send("Invalid Id");
    }
    
}

export const deleteUser = (req, res)=>{
    const {id} = req.params;
    try{
        db.collection('customers').deleteOne({_id:ObjectId(id)}, (err, results)=>{
            if (err) throw err;
        });
    }catch(e){
        res.send("Invalid Id.")
    }
    res.send(`User with id ${id} deleted.`);
};

export const patchUser = (req, res)=>{
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;
    try{
        db.collection("customers").findOne({_id:ObjectId(id)}, (err, results)=>{
            if(err) throw err;
            db.collection("customers").updateOne({_id:ObjectId(id)}, {$set: {firstName: firstName, lastName:lastName, age:age}})
        });
    }catch(e){
        res.send("Invalid Id.");
    };

    res.send(`User with id ${id} has been updated.`)
};