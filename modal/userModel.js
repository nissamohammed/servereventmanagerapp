
const mangoose = require('mongoose')

const userSchema = new mangoose.Schema({
     username:{
        type:String,
        required:true
     },
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

const users = mangoose.model("users",userSchema)
module.exports = users