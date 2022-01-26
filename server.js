require("dotenv").config(); // dotenv help maintain it security

const subscribersRouter = require('./routes/subscribers');

const express = require("express");
const app = express();
const mongoose  = require("mongoose")

// connection to mongodb atlas
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

