const Joi=require('joi');
const express=require('express');
const morgan=require('morgan');
const helmet=require('helmet');
const config=require('config');
const appDebugger=require('debug')('debug:app');
const dbDebugger=require('debug')('debug:db');
const app=express();

//express.json() will return a piece of middle ware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


const students=[
    {
        id:1, name:"Abhishek"
    },
    {
        id:2, name:"Adarsh"
    },
    {
        id:3, name:"Aditi"
    },
    {
        id:4, name:"Aman"
    },
];

// for debugging app

appDebugger(`Application is running in ${process.env.NODE_ENV} environment`);

// for debugging DB
dbDebugger('Connected to database...');


//Config
console.log(`Application Name: ${config.get('name')}`);
console.log(`Emal: ${config.get('server.host')}`);

// To get details about a particular student ID
app.get('/iiitm/students/bcs/:id',(req,res)=>{

    const student=students.find(s=>{
        return s.id===parseInt(req.params.id);
    });

    if(!student)
        return res.status(404).send("Student Not Found");
    else
    res.send(student.name);

});

// To list all the students of BCS
app.get('/iiitm/students/bcs',(req,res)=>{
   res.send(students); 
});

// To add new student
app.post('/iiitm/students/bcs',(req,res)=>{

    const schema={
        name: Joi.string().min(3).required()
    };

    const err=validatename(req.body);
    if(!err.error)
    {
        const student=
        {
            id:students.length+1,
            name:req.body.name
        };
        students.push(student);
        res.send(student);
    }
    else
    {
        res.status(400).send(err.error.details[0].message);
        console.log(err.error.details[0].message);
    }
    
});

// To update student details 
app.put('/iiitm/students/bcs/:id',(req,res)=>{
    
    // Check if that student exist ot not --404
    const student=students.find(s=>{
        return s.id===parseInt(req.params.id);
    });
    if(!student)
         return res.status(404).send('Student ID not found to be updated');

        // Check for validation of size and shape of student 
        const {error}=validatename(req.body);
         if(error)
        return res.status(400).send(error.details[0].message); 
        else
        {
            student.name=req.body.name;
            res.send(student);
        }

});

app.delete('/iiitm/students/bcs/:id',(req,res)=>{

// Check if that student exist ot not --404
const student=students.find(s=>{
    return s.id===parseInt(req.params.id);
});
if(!student)
     return res.status(404).send('Student ID not found to be updated');

const index=students.indexOf(student);
students.splice(index,1);

return res.send(` Deleted : ${student.name}`);

});

// Used JOI.js for inout validation
function validatename(name)
{
    const schema=
    {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(name,schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));