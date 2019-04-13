const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req,res) {
        User.create({
            username : req.body.username,
            password : req.body.password
        })
        .then((data)=> {
            res.status(201).json({msg: `user is created`, data})
        })
        .catch((err)=> {
            res.status(500).json(err.message)
        })
    }

    static login(req,res) {
         
        User.findOne({
            username : req.body.username
        })
        .then((found)=> {
            if (!found) {
                res.status(404).json({msg : `user is not found`})
            } else {
                if (bcrypt.compareSync(req.body.password, found.password)) {                    
                    let token = jwt.sign({
                        username : found.username,
                        id : found._id
                    }, process.env.JWT)
                    res.status(200).json({token, id: found._id})
                } else {
                    res.status(400).json({msg : `please put the correct username/password`})
                }
            }
        })
        .catch((err)=> {
            res.status(500).json(err.message)
        })
    }

    static google(req, res) {
        const { token } = req.body
        let payload;
        let userToken;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then((ticket) => {
                payload = ticket.getPayload()
                const userid = payload['sub']
                
                return User
                    .findOne({ username: payload.email })
            })
            .then((findOneUser) => {
                if (!findOneUser) {
                    return User
                        .create({ username : payload.email , password: '12345'})
                } else return findOneUser
            })
            .then((user) => {
                // console.log(user,'===== ini user')
                const { _id, username} = user
                const userPayload = { _id, username }
                // console.log(userPayload)
                userToken = jwt.sign(userPayload, process.env.JWT)
                console.log(userToken,'===== ini user tokennnn')
                req.headers.token = userToken
                res.status(200).json({ message: 'You are now logged in via Google Sign In!', userToken, details: userPayload })
            })
            .catch((err) => { 
                console.log(err,'ini errorrr')
                res.status(500).json(err) })
    }
}

module.exports = UserController