
const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
date:{
    type:String,
    required:true
},
time:{
    type:String,
    required:true
},
location:{
    type:String,
    required:true
},
userId:{
    type:String,
    required:true
}
})
const events = mongoose.model("events",eventSchema)
module.exports = events