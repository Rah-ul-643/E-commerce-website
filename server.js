// app requirements

const express= require('express');
const app= express();
const session=require('express-session');
const bodyParser= require('body-parser');
const flash = require('express-flash');

const indexRoutes= require("./routes/indexRoutes");
const apiRoutes= require("./routes/api");
const userRoutes= require('./routes/user-routes');

require('dotenv').config();

const key= process.env.key;

// constant variables and values

const port=process.env.port || 8000;

// static files

app.use(express.static('public'));

//set up views and express-flash-message

app.set('view engine', 'ejs');
app.use(flash());

// database connection

const db = require("./config/db");
db();

//session maintanance

app.use(session({secret:key,
    resave: false,
    saveUninitialized: true,
}));

//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//routes

app.use('/', indexRoutes);
app.use('/api',apiRoutes);
app.use('/user',userRoutes);
//activate server 

app.listen(port,()=>{
    console.log(`server running on port: ${port}`);
})
