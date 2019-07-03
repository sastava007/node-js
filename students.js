const Joi=require('joi');
const express=require('express');
const router=express.Router();

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

// To get details about a particular student ID
router.get('/:id',(req,res)=>{

    const student=students.find(s=>{
        return s.id===parseInt(req.params.id);
    });

    if(!student)
        return res.status(404).send("Student Not Found");
    else
    res.send(student.name);

});

// To list all the students of BCS
router.get('/',(req,res)=>{
   res.send(students); 
});

// To add new student
router.post('/',(req,res)=>{

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
router.put('/:id',(req,res)=>{
    
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

// to delete detail of a particular student
router.delete('/:id',(req,res)=>{

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

module.exports=router;