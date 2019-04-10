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
}

module.exports = UserController