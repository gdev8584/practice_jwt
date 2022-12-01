const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// create collecton now
const Register = new mongoose.model("Register",employeeSchema);

module.exports= Register;