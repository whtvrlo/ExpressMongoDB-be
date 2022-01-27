require("dotenv").config(); // dotenv help maintain it security

const subscribersRouter = require('./routes/subscribers');

const express = require("express");
const app = express();
const mongoose  = require("mongoose")

// MONGO DB CONNECION
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB")
        //const db = mongoose.connection

    } catch (error) {
        console.log(error)
    }
}
connection()

app.use(express.json())

app.use('/subscribers', subscribersRouter); //localhost:3000/subscribers

app.listen(3000, () => console.log('Server Started'));

// // HEROKU
// if (process.env.NODE_ENV === "PRODUCTION"){
//     module.exports.connection = new mongoose (`${process.env.DATABASE_URL}?sslmode=require`, {
//         url: process.env.DATABASE_URI,
//         dialect: "postgress",
//         dialectOptions: {
//             ssl: {
//                 rejectUnauthorized: false,
//             },
//         },
//     }
//     );
// } else {
//     module.exports.connection = new mongoose(process.env.DATABASE_URI);
//     console.log("DB connection is succesful");
// }