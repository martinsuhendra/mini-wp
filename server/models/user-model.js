const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltround = 10;
const salt = bcrypt.genSaltSync(saltround)

const userSchema = new Schema({
    username : {
        type: String,
        required : [true, 'please input username'],
    },
    password : {
        type : String,
        required : [true, 'please input password']
    }
})

userSchema.pre('save', function(next){
    let hash = bcrypt.hashSync(this.password, salt);
    this.password = hash
    next()
})

userSchema.path('username').validate(function (value, respond) {
    return mongoose
      .model('User')
      .collection
      .countDocuments({ username: value })
      .then(function (count) {
        if (count > 0) {
          return false
        }
      })
      .catch(function (err) {
        throw err
      })
  }, 'Username already exists!!')

const User = mongoose.model('User', userSchema)

module.exports = User