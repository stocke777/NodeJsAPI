
import { ObjectId } from "mongodb";
import { default as mongodb } from 'mongodb';

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


let users = [];
export const getAllUsers = (req, res)=>{
    let customers = db.collection('customers');
    customers.find().toArray((err, results) => {
        res.send(results);
    });
};

export const createUser = (req, res)=>{
    const user = req.body;
    let customers = db.collection('customers');
    try{
        customers.insertOne({ firstName: user.firstName, lastName: user.lastname, age: user.age  }, (err, result) => {
            if(err) throw err;
        });
    }
    catch(e){
        res.send("Provide correct details please.")
    }
    res.send(`User with name ${user.firstName} saved.`);
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

export const deleteUser = (req, res)=>{
    const {id} = req.params;
    try{
        db.collection('customers').deleteOne({_id:ObjectId(id)}, (err, results)=>{
            if (err) throw err;
        });
    }catch(e){
        res.send("Invalid Id.")
    };
    res.send(`User with id ${id} deleted.`);
};

export const patchUser = (req, res)=>{
    const {id} = req.params;
    const {firstName, lastName, age} = req.body;
    try{
        let user = db.collection("customers").findOne({_id:ObjectId(id)}, (err, results)=>{
            if(err) throw err;
            db.collection("customers").updateOne({_id:ObjectId(id)}, {$set: {firstName: firstName, lastName:lastName, age:age}})
        });
    }catch(e){
        res.send("Invalid Id.");
    };

    res.send(`User with id ${id} has been updated.`)
};