const mongoose = require('mongoose');
const connectionString = process.env.DATABASE;
mongoose.connect(connectionString).then(()=>{
    console.log(`Mongodb Running Successfully `);  
}).catch((err)=>{
console.log(`Not connected to MongoDB Database!!! Error : ${err}`);

})