const jwt = require('jsonwebtoken')

const users = require("../modal/userModel");



//register
exports.registerController =async(req,res)=>{
    console.log('inside the register controller');
    const {username,email,password} = req.body
   // console.log(username,email,password);
   // res.status(200).json('register request recieved')

try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(406).json('Account Already exist')
    }
    else{
        const newUser = new users({
            username, 
            email,
            password 
        })
        await newUser.save()
        res.status(200).json(newUser)
    }

}catch(error){
    res.status(401).json(`registration failed due to ${error}`)
}

}

//login
exports.loginController = async(req,res)=>{
    const {email , password} = req.body
     try{
         const existingUser = await users.findOne({email,password})
         if(existingUser){
            const token = jwt.sign({userId:existingUser._id},'supersecretkey')
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json('invalid emailId or password')
        }
     }catch(error){
        res.status(401).json(error)
     }
}

