const express = require('express')
const router = new express()
const Student = require("../models/students")
const {authValidate} = require("../models/students.validators")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


// app.post('/students',(req,res)=>{
//     console.log(req.body)
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>{

//     })
//     res.status(400).send("hello students");
// })

router.post('/students', upload.single('image'), async(req,res)=>{
    try{
        console.log(req.file);
        // console.log(req.body)
        const user = new Student(req.body)
        const createUser = await user.save()
        res.status(201).send(createUser)
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

router.get('/students', async(req,res)=>{
    try{
        const sdata = await Student.find();
        res.send(sdata)
        // console.log(sdata)
        // const l = sdata.length;
        // for(let i=0;i<l;i++){
        //     console.log(sdata[i].name)
        // }
        // console.log(l);
    }catch(e){
        res.send(e)
    }
})

router.get('/students/:id?', async (req,res)=>{
    try{
        const _id = req.params.id;
        console.log(req.params)
        const studentData  = await Student.findById(_id);
        // console.log(studentData)
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){
        res.status(500).send();
    }
})

// find by name

// router.get('/students/:name?', async (req,res)=>{
//     try{
//         const name = req.params.name;
//         console.log(req.params)
//         const studentData  = await Student.findOne({name: name});
//         console.log(studentData)
//         if(!studentData){
//             console.log('not found')
//             return res.status(404).send();
//         }else{
//             res.send(studentData);
//         }
//     }catch(e){
//         res.status(500).send();
//     }
// })

// update the students by it id

router.patch("/students/:id", async (req, res) => {
    try{
        const _id  = req.params.id;
        
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudents);
        console.log('update successfully')
    }catch(e){
        res.status(400).send(e);
        console.log('not updated')
    }
})

// delete the students by it id
router.delete('/students/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(id);
        if(!id){
            return res.status(400),send();
        }
        res.send(deleteStudent)
    }catch(e){
        res.status(500).send(e);
    }
})

router.get('/student',(req,res)=>{
    res.send("hello world!")
})

module.exports = router;