
const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const config=require('config');
const appDebugger=require('debug')('debug:app');
const dbDebugger=require('debug')('debug:db');
const students=require('./students');
const app=express();

//express.json() will return a piece of middle ware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/iiitm/students/bcs',students);

// for debugging app
appDebugger(`Application is running in ${process.env.NODE_ENV} environment`);

// for debugging DB
dbDebugger('Connected to database...');


//Config
console.log(`Application Name: ${config.get('name')}`);
console.log(`Email: ${config.get('server.host')}`);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));