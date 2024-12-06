require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes');
require('./connections');
const eventmanagerServer = express();
eventmanagerServer.use(cors());
eventmanagerServer.use(express.json());
eventmanagerServer.use(router);
PORT = 4000 || process.env.PORT;
eventmanagerServer.listen(PORT,()=>{
    console.log(`Event manager App server running successfully at port number: ${PORT}`);  
})