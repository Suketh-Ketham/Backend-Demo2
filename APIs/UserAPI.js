import exp from 'express'
import { UserModel } from '../Models/UserModel.js'
import { hash,compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from './middleWares/verifyToken.js'
export const userApp = exp.Router()

//Create users
userApp.post('/users', async(req,res) =>    {
    //get newuser from req
    let newUser = req.body
    //hash the password
    let hashedPassword = await hash(newUser.password, 12)

    newUser.password = hashedPassword
    //create new user document
    let newUserDoc = new UserModel(newUser)
    
    //save in db
    await newUserDoc.save()

    res.status(201).json({message:"User created"})
})

//User authentication(login) route
userApp.post('/auth', async(req,res) =>{
    //get user cred obj
    let userCred = req.body
    //check for username
    let userOfDB = await UserModel.findOne({username:userCred.username})
    //if user not found
    if(userOfDB === null){
        return res.status(404).json({message:"Invalid username"})
    }
    //compare passwords
    let status = await compare(userCred.password, userOfDB.password)
    //if passwords not matched
    if(status === false){
        console.log(userCred.password)
        console.log(userOfDB.password)
        return res.status(404).json({message:"Invalid password"})
        

    }
    //create signed token
    let signedToken = jwt.sign({username:userCred.username}, 'abcdef',{expiresIn:30})
    //create signed token
    res.cookie('token',signedToken,{
        httpOnly:true, //it is httpOnly cookie
        secure:false,
        sameSite:"lax"
    })
    res.status(200).json({message:"Login success"})
})
//Read users
userApp.get('/users', async(req, res) =>    {
    //read users from DB
    let users = await UserModel.find()
    //send res
    res.status(200).json({message:"users", payload:users})
})

//Read user by ObjectID
userApp.get('/users/:id', async(req, res) =>    {
    //get ObjectID from url parameter
    let objID = req.params.id

    //find user in DB
    let userObj = await UserModel.findById(objID)

    //send res
    res.status(200).json({message:"user",payload:userObj})
})

//Update user
userApp.put('/users/:id', async(req, res) => {
    //get objId from url
    let objId = req.params.id

    //get modified user from req
    let modifiedUser = req.body

    //make update
    let latestUser = await UserModel.findByIdAndUpdate(objId, { $set: { ...modifiedUser}})

    //send res
    res.status(200).json({message:"user modified"})
})

//Delete user by objId
userApp.delete('/users/:id', async(req, res) => {
    //get objId from url
    let objId = req.params.id

    //delete user by id
    let deletedUser = await UserModel.findByIdAndDelete(objId)
    res.status(200).json({message:"User deleted", payload:deletedUser})
})


userApp.get('/test', verifyToken, (req, res) =>{
    res.status(200).json({message:"Test"})
})