const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require('cors');

// const bodyParser = require("body-parser");



dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    () => { console.log("DB Connected!"); }
);

const app = express();



//Import Routes
const listingRoutes =  require('./routes/listing');
const userRoutes = require('./routes/user');

//Middleware
app.use(express.json());
app.use(cors());



//Routes Middleware
app.use('/api/listings', listingRoutes);
app.use('/api/user', userRoutes);


app.listen(4000, () =>{
    console.log("App is listening port 4000!");
});