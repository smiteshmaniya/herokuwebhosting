const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = new mongoose.Schema({
    name : {
        require: true,
        type: String,
        // minlength: 2
    },
    
    email : {
        type: String,
        require: true
        // unique: [true, "Email id already exist"],
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Invalid Email Id")
        //     }
        // }
    },
    phone: {
        type: Number,
        // minlength: 10,
        require: true,
        // unique: true
    },
    address: {
        type: String,
        require: true
    },
    image: {
        type: String
    }

})

const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;